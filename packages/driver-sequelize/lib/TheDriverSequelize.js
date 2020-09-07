'use strict'

const prepareModelAssociations = require('./modeling/prepareModelAssociations')
const clayCollection = require('clay-collection')
const { Driver } = require('clay-driver-base')
const { pageToOffsetLimit } = require('clay-list-pager')
const clayResourceName = require('clay-resource-name')
const mkdirp = require('mkdirp')
const path = require('path')
const { Op } = require('sequelize')
const { isProduction, unlessProduction } = require('@the-/check-env')
const MetaColumnNames = require('./constants/MetaColumnNames')
const convertInbound = require('./converters/convertInbound')
const convertOutbound = require('./converters/convertOutbound')
const createSequelize = require('./helpers/createSequelize')
const defineModel = require('./modeling/defineModel')
const prepareModel = require('./modeling/prepareModel')
const { parseAttributes, parseFilter, parseSort } = require('./parsing')

/**
 * @memberof @the-/driver-sequelize
 * @class TheDriverSequelize
 */
class TheDriverSequelize extends Driver {
  constructor (config = {}) {
    super()
    const {
      charset = 'utf8',
      collate = 'utf8_general_ci',
      database,
      dialect = 'sqlite',
      logging = false,
      password,
      storage = `var/db/${database}.db`,
      username,
      ...otherOptions
    } = config
    this.closed = false
    this.models = {}
    this.schemas = {}
    this.prepareLocks = {}
    this.charset = charset
    this.collate = collate
    this._sequelizeArgs = [
      database,
      username,
      password,
      {
        charset,
        collate,
        dialect,
        logging,
        storage,
        ...otherOptions,
      },
    ]
    this.includesFor = name => {
      const schema = this.schemas[name]
      const associations = Object.values(schema)
        .map(def => def.associate)
        .filter(Boolean)
        .map(([name, opt = {}]) => opt.as || name)
      return associations
    }
  }

  get sequelize () {
    if (!this._sequelize) {
      this._sequelize = createSequelize(...this._sequelizeArgs)
    }

    return this._sequelize
  }

  assertOpen () {
    if (this.closed) {
      if (!isProduction()) {
        console.trace('[TheDriverSequelize] DB access after closed')
      }

      throw new Error('[TheDriverSequelize] DB Already closed')
    }
  }

  /**
   * Define schema
   * @param {string} resourceName
   * @param {Object} schema
   * @param {Object} [options={}]
   */
  define (resourceName, schema, options = {}) {
    const { indices } = options
    const Model = defineModel(this.sequelize, resourceName, schema, {
      indices,
    })
    this.schemas[resourceName] = schema
    this.models[resourceName] = Model
    this._prepared = false
  }

  inbound (resourceName, values) {
    const Model = this.modelFor(resourceName)
    const Schema = this.schemaFor(resourceName)
    const { name: ModelName, rawAttributes: ModelAttributes } = Model
    return convertInbound(values, { ModelAttributes, ModelName, Schema })
  }

  modelFor (resourceName) {
    const Model = this.models[resourceName]
    if (!Model) {
      throw new Error(
        `[TheDriverSequelize] Model not defined for ${resourceName}`,
      )
    }

    return Model
  }

  outbound (resourceName, values) {
    const Model = this.modelFor(resourceName)
    const Schema = this.schemaFor(resourceName)
    const include = this.includesFor(Model.name)
    const { name: ModelName, rawAttributes: ModelAttributes } = Model
    const associated = include
    return convertOutbound(values, {
      ModelAttributes,
      ModelName,
      Schema,
      resourceName,
      associated,
      outbound: (v) => {
        return this.outbound(v.constructor.name, v.dataValues)
      }
    })
  }

  schemaFor (resourceName) {
    const Schema = this.schemas[resourceName]
    if (!Schema) {
      throw new Error(
        `[TheDriverSequelize] Schema not defined for ${resourceName}`,
      )
    }

    return Schema
  }

  async close () {
    await this.prepareIfNeeded()

    const { sequelize } = this
    this.closed = true
    await sequelize.close()
  }

  async create (resourceName, values = {}, options = {}) {
    const { transaction } = options
    await this.untilReady()
    const Model = this.modelFor(resourceName)
    const include = this.includesFor(Model.name)
    const { id } = await Model.create(this.inbound(resourceName, values), {
      transaction,
    })
    const model = await Model.findByPk(id, { transaction, include, })
    return this.outbound(resourceName, model.dataValues)
  }

  async createBulk (resourceName, valuesArray, options = {}) {
    const { transaction } = options
    await this.untilReady()
    const Model = this.modelFor(resourceName)
    const models = await Model.bulkCreate(
      valuesArray.map((values) => this.inbound(resourceName, values)),
      { transaction },
    )
    const created = []
    for (const model of models) {
      created.push(await this.outbound(resourceName, model.dataValues))
    }
    return created
  }

  async destroy (resourceName, id, options = {}) {
    const { transaction } = options
    await this.untilReady()
    const Model = this.modelFor(resourceName)
    const model = await Model.findByPk(id)
    if (!model) {
      return 0
    }

    await model.destroy({ transaction })
    return 1
  }

  async drop (resourceName) {
    await this.untilReady()
    const Model = this.modelFor(resourceName)
    await Model.drop({ force: true })
    await Model.sync().catch(() => {
      // 失敗したら諦める
    })
  }

  async list (resourceName, condition = {}, options = {}) {
    const { attributes, transaction } = options
    await this.untilReady()
    const Model = this.modelFor(resourceName)
    const Schema = this.schemaFor(resourceName)
    const { name: ModelName, rawAttributes: ModelAttributes } = Model

    const { filter = {}, page = {}, sort = [] } = condition
    const { limit, offset } = pageToOffsetLimit(page)
    const order = parseSort(sort, { ModelAttributes, ModelName, Schema })
    const where = parseFilter(filter, { ModelAttributes, ModelName, Schema })
    const include = this.includesFor(Model.name)
    const { count, rows } = await Model.findAndCountAll({
      attributes: parseAttributes(attributes),
      include,
      limit,
      offset,
      order,
      transaction,
      where,
    })
    return clayCollection({
      entities: await Promise.all(
        rows.map(async (entity) =>
          this.outbound(resourceName, entity.dataValues),
        ),
      ),
      meta: {
        length: rows.length,
        limit,
        offset,
        total: count,
      },
    })
  }

  async one (resourceName, id, options = {}) {
    const { attributes, transaction } = options
    await this.untilReady()
    const Model = this.modelFor(resourceName)
    unlessProduction(() => {
      const invalidId = id && typeof id !== 'string'
      if (invalidId) {
        throw new Error(
          `[TheDriverSequelize][${resourceName}] Invalid id passed for .one(): ${JSON.stringify(
            id,
          )}`,
        )
      }
    })
    const model = await Model.findByPk(id, {
      attributes: parseAttributes(attributes),
      transaction,
      include: this.includesFor(Model.name),
    })
    if (!model) {
      return null
    }
    return this.outbound(resourceName, model.dataValues)
  }

  async oneBulk (resourceName, ids, options = {}) {
    const { attributes, transaction } = options
    await this.untilReady()
    const Model = this.modelFor(resourceName)
    const models = await Model.findAll(
      {
        where: {
          id: { [Op.in]: [...ids] },
        },
      },
      { attributes: parseAttributes(attributes), transaction },
    )
    const found = {}
    for (const model of models) {
      found[String(model.id)] = await this.outbound(
        resourceName,
        model.dataValues,
      )
    }
    return found
  }

  async prepare () {
    const { sequelize } = this
    const { dialect, storage } = sequelize.options || {}
    switch (dialect) {
      case 'sqlite':
        await mkdirp(path.dirname(storage))
        break
      default:
        break
    }

    for (const [resourceName, Model] of Object.entries(this.models)) {
      await this.prepareLocks[resourceName]
      const promise = (async () => {
        const Schema = this.schemas[resourceName]
        await prepareModel(Model, Schema)
      })()
      this.prepareLocks[resourceName] = promise
      await promise
    }
    if (!this._modelAssociationsPrepared) {
      this._modelAssociationsPrepared = true
      await prepareModelAssociations(this.models, this.schemas)
    }
  }

  async prepareIfNeeded () {
    await this._preparing
    if (this._prepared) {
      return
    }

    try {
      this._preparing = this.prepare()
      await this._preparing
      this._prepared = true
    } catch (e) {
      console.error('[TheDriverSequelize] Prepare failed', e)
      process.exit(1)
    } finally {
    }
  }

  async resources () {
    const { models } = this
    return Object.entries(models).map(([resourceName]) => {
      const { domain, name } = clayResourceName(resourceName)
      return { domain, name }
    })
  }

  async transaction () {
    return this.sequelize.transaction(...arguments)
  }

  /**
   * Wait until ready
   * @returns {Promise<undefined>}
   */
  async untilReady () {
    this.assertOpen()
    await this.prepareIfNeeded()
  }

  async update (resourceName, id, values, options = {}) {
    const { transaction } = options
    await this.untilReady()
    const Model = this.modelFor(resourceName)
    const model = await Model.findByPk(id)
    if (!model) {
      throw new Error(`[TheDriverSequelize] Data not found for id: ${id}`)
    }

    const version = model.getDataValue(MetaColumnNames.$$num)
    const include = this.includesFor(Model.name)
    await model.update(
      this.inbound(resourceName, {
        ...values,
        [MetaColumnNames.$$num]: version + 1,
      }),
      { transaction, include, },
    )
    const { dataValues } = await Model.findByPk(id, { transaction, include, })
    return this.outbound(resourceName, dataValues)
  }
}

module.exports = TheDriverSequelize
