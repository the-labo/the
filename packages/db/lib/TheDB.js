/**
 * @class TheDB
 * @extends ResourceMixed
 * @extends ExportImportMixed
 * @extends MigrateMixed
 * @extends RefreshMixed
 * @extends CliMixed
 * @param {Object} config
 * @param {string} [config.name=uuid.v4()] Name of clay-lump
 * @param {string} [config.dialect='memory'] - Database dialect. "mysql", "json", "memory", "localstorage", or "sqlite"
 * @param {string} [config.storage] - Storage file name for "sqlite" or "json" dialect
 * @param {string} [config.database] - Name of database schema
 * @param {string} [config.username] - Database username
 * @param {string} [config.password] - Database password
 * @param {string} [config.host] - Database password
 * @param {string} [config.port] - Database password
 * @param {object} [config.plugins] - Database plugin creators
 * @param {object} [config.hooks] - Database hook creators
 * @param {object} [config.resources] - Database resource classes
 */
'use strict'

const { unlinkAsync } = require('asfs')
const asleep = require('asleep')
const { clone } = require('asobj')
const { ClayLump } = require('clay-lump')
const { toLowerKeys } = require('the-db-util')
const { isResourceClass } = require('the-resource-base')
const uuid = require('uuid')
const { unlessProduction } = require('@the-/check')
const theHash = require('@the-/hash')
const driverFromEnv = require('./driverFromEnv')
const execForEnv = require('./execForEnv')
const { asBound, indexBounds } = require('./helpers/binder')
const parsePolicy = require('./helpers/parsePolicy')
const parseSchema = require('./helpers/parseSchema')
const m = require('./mixins')
const { TheLogResource, TheSchemaResource } = require('./resources')
const setupForEnv = require('./setupForEnv')

const TheDBBase = [
  m.resourceMix,
  m.cliMix,
  m.exportImportMix,
  m.migrateMix,
  m.refreshMix,
  m.cascadeMix,
].reduce((Class, mix) => mix(Class), ClayLump)

/** @lends TheDB */
class TheDB extends TheDBBase {
  constructor(config = {}) {
    if (!new.target) {
      throw new Error('`TheDB()` must be called with `new`')
    }
    const {
      hooks = {},
      name = uuid.v4(),
      plugins = {},
      refreshInterval = 300,
      resourceLogFile = 'var/db/resources.log',
      resources = {},
    } = config
    const env = toLowerKeys(
      config.env || clone(config, { without: ['name', 'resources'] }),
    )
    const driver = driverFromEnv(env)
    super(name, { driver })

    this._unref = false
    this._env = env
    this._plugins = theHash(this._plugins || {})
    this._resources = theHash(this._resources || {})

    unlessProduction(() => {
      this._plugins = this._plugins.toProxy({
        name: 'db/plugins',
        unknownCheck: true,
      })
      this._resources = this._resources.toProxy({
        name: 'db/resources',
        unknownCheck: true,
      })
    })

    this.exec = (sql) => execForEnv(this.env, sql)
    this.schemas = {}
    this.indices = {}
    this.closed = false
    this.loadFromMapping({
      TheDBLog: TheLogResource,
      TheDBSchema: TheSchemaResource,
      ...resources,
    })
    this.pluginFromMapping({
      ...plugins,
    })
    this.hooksFromMapping({
      ...hooks,
    })

    const { TheDBLog } = this._resources
    TheDBLog.filename = resourceLogFile
    this.startRefreshLoop({ interval: refreshInterval })
    this.startCascadeLink()
  }

  get env() {
    return this._env
  }

  get plugins() {
    return this._plugins
  }

  get resources() {
    return this._resources
  }

  /**
   * Register hooks from mapping
   * @param {Object} HookMapping
   */
  hooksFromMapping(HookMapping) {
    for (const [resourceName, creator] of Object.entries(HookMapping)) {
      this.assertResource(resourceName)
      const resource = this.getResource(resourceName)
      const { onCreate, onDestroy, onDrop, onUpdate } = creator(this, {
        resourceName,
      })
      resource.listenTo({ onCreate, onDestroy, onDrop, onUpdate })
    }
  }

  /**
   * Register resource form Resource Class
   * @param {function} ResourceClass - Resource class to register
   * @param {string} resourceName - Name of resource
   * @returns {ClayResource} Loaded resource class
   */
  load(ResourceClass, resourceName) {
    unlessProduction(({ ok }) => {
      ok(!!ResourceClass, 'ResourceClass is required')
      ok(
        isResourceClass(ResourceClass),
        'ResourceClass should inherit TheResource',
      )
    })

    const { driver } = this
    const {
      collectionClass,
      entityClass,
      inbound,
      indices = [],
      onCreate,
      onDestroy,
      onDrop,
      onUpdate,
      outbound,
      policy,
      schema,
      skipResolvingRefFor,
    } = ResourceClass
    const duplicate = this.hasResource(resourceName)

    const wrapActionContext = (actionContext) =>
      Object.assign(actionContext, {
        skipResolvingRefFor: []
          .concat(actionContext.skipResolvingRefFor, skipResolvingRefFor)
          .filter(Boolean),
      })

    if (duplicate) {
      throw new Error(
        `Resource with name "${resourceName}" is already registered!`,
      )
    }
    const resource = ResourceClass.fromDriver(driver, resourceName, {
      annotates: true,
    })
    if (policy || schema) {
      resource.policy(parsePolicy(policy || schema))
    }
    if (schema) {
      if (driver.define) {
        driver.define(resourceName, parseSchema(schema, { indices }))
      } else {
        if (!/^The/.test(resourceName)) {
          console.warn(`[TheDB] Schema not defined: ${resourceName}`)
        }
      }
    }

    const { indexInbound, indexOutbound } = indexBounds(indices)
    // Wrap inbound
    {
      const { applyInbound } = resource
      const inboundHandler = asBound(inbound)
      resource.applyInbound = async function applyInboundWrap(
        attributesArray,
        actionContext = {},
      ) {
        actionContext = wrapActionContext(actionContext)
        attributesArray = await indexInbound(
          resource,
          attributesArray,
          actionContext,
        )
        attributesArray = await inboundHandler(
          resource,
          attributesArray,
          actionContext,
        )
        attributesArray = await applyInbound.call(
          resource,
          attributesArray,
          actionContext,
        )
        return attributesArray
      }
    }
    // Wrap outbound
    {
      const { applyOutbound } = resource
      const outboundHandler = asBound(outbound)
      resource.applyOutbound = async function applyOutboundWrap(
        entities,
        actionContext = {},
      ) {
        actionContext = wrapActionContext(actionContext)
        entities = await applyOutbound.call(resource, entities, actionContext)
        entities = await outboundHandler(resource, entities, actionContext)
        entities = await indexOutbound(resource, entities, actionContext)
        // TODO Remove
        {
          for (const entity of entities) {
            entity.id = String(entity.id)
          }
        }
        return entities
      }
    }
    if (entityClass) {
      resource.enhanceResourceEntity(entityClass)
    }
    if (collectionClass) {
      resource.enhanceResourceCollection(collectionClass)
    }
    resource.listenTo({ onCreate, onDestroy, onDrop, onUpdate })

    this.setResource(resourceName, resource)
    this.theDBLogEnabled = true
    this.schemas[resourceName] = schema
    this.indices[resourceName] = indices
    resource.db = this

    return resource
  }

  /**
   * Load resources from mapping object
   * @param {Object.<string, function>} ResourceMapping - Resource name and class
   */
  loadFromMapping(ResourceMapping) {
    for (const [as, Resource] of Object.entries(ResourceMapping)) {
      this.load(Resource, as)
    }
  }

  /**
   * Register plugins from mapping
   * @param {Object} PluginMapping
   */
  pluginFromMapping(PluginMapping) {
    for (const [pluginName, creator] of Object.entries(PluginMapping)) {
      if (pluginName in this._plugins) {
        throw new Error(`[TheDB] Plugin already exists: "${pluginName}"`)
      }
      this._plugins[pluginName] = creator(this, { pluginName })
    }
  }

  /**
   * Aut close before exit
   * @returns {TheDB} this
   */
  unref() {
    if (this._unref) {
      throw new Error(`Already unref`)
    }
    process.setMaxListeners(process.getMaxListeners() + 1)
    process.on('beforeExit', () => {
      if (!this.closed) {
        return this.close()
      }
    })
    this._unref = true
    return this
  }

  async close(...args) {
    await asleep(10)
    if (this.closed) {
      return
    }
    this.stopRefreshLoop()
    this.stopCascadeLink()
    this.emit('beforeClose')
    const { resources } = this
    for (const name of Object.keys(resources)) {
      const resource = resources[name]
      try {
        await resource.close()
      } catch (e) {
        // Do nothing
      }
    }
    await asleep(10)

    super.close(...args)
    this.emit('close')
    await asleep(10)
    this.closed = true
  }

  /**
   * Drop database
   * @returns {Promise<void>}
   */
  async drop() {
    const { driver, resources } = this
    const { database, dialect, storage } = this.env
    switch (String(dialect).trim()) {
      case 'mysql': {
        await this.close().catch(() => null)
        await asleep(100)
        await this.exec(`DROP DATABASE IF EXISTS \`${database}\``)
        return
      }
      case 'sqlite': {
        await unlinkAsync(storage).catch(() => null)
        return
      }
      default:
        break
    }
    if (!driver.drop) {
      throw new Error(`[TheDB] drop() is not implemented!`)
    }
    for (const resourceName of Object.keys(resources)) {
      await driver.drop(resourceName)
    }
    await asleep(10)
  }

  /**
   * Invalidate entity
   * @param {string} entityRef
   * @returns {Promise<void>}
   */
  async invalidate(entityRef) {
    if (Array.isArray(entityRef)) {
      return Promise.all(entityRef.map((r) => this.invalidate(r)))
    }
    if (entityRef.toRef) {
      entityRef = entityRef.toRef()
    }
    this.requestToRefresh(entityRef)
  }

  async setup() {
    const { driver, env, indices, schemas } = this
    await setupForEnv(env)
    for (const [resourceName, schema] of Object.entries(schemas)) {
      if (!schema) {
        continue
      }
      if (driver.define) {
        await driver.define(resourceName, schema, {
          indices: indices[resourceName],
        })
      }
    }
  }

  /**
   * Create transaction
   * @param {?function} callback
   * @returns {Promise<*>}
   */
  async transaction(callback) {
    const { driver } = this
    if (!driver.transaction) {
      console.warn(`[TheDB] transaction() is not implemented!`)
      if (callback) {
        callback(null)
      }
      return null
    }
    return driver.transaction(callback)
  }

  /**
   * Update database migration version
   * @param {string} version - Version string
   * @returns {Promise.boolean} Success or not
   */
  async updateVersion(version) {
    return this.updateMigrationVersion(version)
  }
}

module.exports = TheDB
