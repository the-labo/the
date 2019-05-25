'use strict'
/**
 * Driver for mongo db
 * @memberof module:@the-/driver-mongo
 * @class MongoDriver
 * @augments Driver
 * @inheritdoc
 */
const asleep = require('asleep')
const clayCollection = require('clay-collection')
const { Driver } = require('clay-driver-base')
const clayEntity = require('clay-entity')
const { pageToOffsetLimit } = require('clay-list-pager')
const clayResourceName = require('clay-resource-name')
const { unlessProduction } = require('@the-/check')
const {
  parseFilter,
  parseInboundAttributes,
  parseOutboundAttributes,
  parseSort,
} = require('./helpers/parser')
const m = require('./mixins')

const asEntity = (values) => {
  const entity = clayEntity(parseOutboundAttributes(values))
  delete entity._id
  return entity
}

const MongoDriverBase = [m.mongoMix].reduce(
  (Driver, mix) => mix(Driver),
  Driver,
)

/** @lends module:@the-/driver-mongo.MongoDriver */
class MongoDriver extends MongoDriverBase {
  constructor(config) {
    super()
    const {
      database,
      host,
      password,
      port,
      ssl = false,
      username,
      ...rest
    } = config

    unlessProduction(() => {
      const restKeys = Object.keys(rest)
      if (restKeys.length > 0) {
        console.warn('[MongoDriver] Unknown config', restKeys)
      }
    })

    this._dbConnecting = this.connectToMongo({
      database,
      host,
      password,
      port,
      ssl,
      username,
    })
      .then((db) => {
        this.db = db
      })
      .catch((err) => {
        console.error(err)
        process.exit(1)
      })
      .then(() => {
        this._dbConnecting = null
      })
  }

  async close() {
    await this._dbConnecting
    await asleep(10)
    if (this.db) {
      this.db.close()
      this.db = null
    }
  }

  async create(resourceName, attributes) {
    const _id = this.mongoObjectId()
    const collection = await this._collectionFor(resourceName)
    const id = String(attributes.id || _id)
    await collection.insertOne({
      _id: this.mongoObjectId(_id),
      id,
      ...parseInboundAttributes(attributes),
    })
    return this.one(resourceName, id)
  }

  async destroy(resourceName, id) {
    const collection = await this._collectionFor(resourceName)
    const found = await collection.findOne({ id: String(id) })
    if (!found) {
      return 0
    }
    const { _id } = found
    const destroyed = await collection.deleteOne({
      _id,
    })
    return destroyed.deletedCount
  }

  async drop(resourceName) {
    const collection = await this._collectionFor(resourceName)
    collection.drop()
  }

  async dump(dirname, options = {}) {
    await this._dbConnecting
    console.warn('[MongoDriver] Not implemented!')
  }

  async list(resourceName, condition = {}) {
    const collection = await this._collectionFor(resourceName)
    const { filter = {}, page = {}, sort = [] } = condition
    const { limit, offset } = pageToOffsetLimit(page)
    const query = parseFilter(filter)
    const found = await collection.find(query, {
      limit,
      skip: offset,
      sort: parseSort(sort),
    })
    const entities = await found.toArray()
    const count = await collection.countDocuments(query)
    return clayCollection({
      entities: entities.map((found) => asEntity(found)),
      meta: {
        length: entities.length,
        limit,
        offset,
        total: count,
      },
    })
  }

  async one(resourceName, id) {
    const collection = await this._collectionFor(resourceName)
    const found = await collection.findOne({ id: String(id) })
    if (!found) {
      return null
    }
    return asEntity(found)
  }

  async resources() {
    await this._dbConnecting
    const { db } = this
    const info = db.listCollections({})
    const resourceNames = (await info.toArray()).map((name) => name)
    return resourceNames.map((resourceName) => {
      const { domain, name } = clayResourceName(resourceName)
      return { domain, name }
    })
  }

  async restore(dirname, options = {}) {
    await this._dbConnecting
    throw new Error('Not implemented!')
  }

  async update(resourceName, id, attributes) {
    const collection = await this._collectionFor(resourceName)
    const one = await collection.findOne({ id: String(id) })
    if (!one) {
      throw new Error(`[TheDriverMongo] Data not found for id: ${id}`)
    }
    const { _id } = one
    const $set = parseInboundAttributes(
      Object.assign(
        {},
        ...Object.entries(attributes)
          .map(([k, v]) =>
            /^\$|^id$|^_id$/.test(k)
              ? null
              : {
                  [k]: v,
                },
          )
          .filter(Boolean),
      ),
    )
    const isEmpty = Object.keys($set).length === 0
    if (!isEmpty) {
      await collection.updateOne(
        {
          _id,
        },
        {
          $set,
        },
      )
    }
    return this.one(resourceName, id)
  }

  async _collectionFor(resourceName) {
    await this._dbConnecting
    if (!this.db) {
      throw new Error('DB Already closed')
    }
    const collection = this.db.collection(resourceName)
    await collection.createIndex('id')
    return this.enhanceMongoCollection(collection)
  }
}

module.exports = MongoDriver
