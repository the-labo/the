'use strict'

const { unlinkAsync } = require('asfs')
const asleep = require('asleep')
const { clone } = require('asobj')
const { ClayLump } = require('clay-lump')
const isClass = require('is-class')
const { v4: uuid } = require('uuid')
const theAssert = require('@the-/assert')
const { unlessProduction } = require('@the-/check-env')
const theHash = require('@the-/hash')
const { TheResource } = require('@the-/resource')
const { toLowerKeys } = require('@the-/util-db')
const driverFromEnv = require('./driverFromEnv')
const execForEnv = require('./execForEnv')
const { asBound } = require('./helpers/binder')
const parsePolicy = require('./helpers/parsePolicy')
const m = require('./mixins')
const { TheLogResource, TheSchemaResource } = require('./resources')
const setupForEnv = require('./setupForEnv')

const assert = theAssert('the:db')

/**
 * @memberof module:@the-/db
 * @class TheDBBase
 */
const TheDBBase = [
  m.resourceMix,
  m.cliMix,
  m.migrateMix,
  m.refreshMix,
  m.cascadeMix,
].reduce((Class, mix) => mix(Class), ClayLump)

/**
 * @memberof module:@the-/db
 * @class TheDB
 * @augments module:@the-/db.cascadeMix~CascadeMixed
 * @augments module:@the-/db.cliMix~CliMixed
 * @augments module:@the-/db.migrateMix~MigrateMixed
 * @augments module:@the-/db.refreshMix~RefreshMixed
 * @augments module:@the-/db.resourceMix~ResourceMixed
 * @param {Object} config
 * @param {string} [config.name=uuid()] Name of clay-lump
 * @param {string} [config.dialect='memory'] - Database dialect. "mysql", "json", "memory", "localstorage", or "sqlite"
 * @param {string} [config.storage] - Storage file name for "sqlite" or "json" dialect
 * @param {string} [config.database] - Name of database schema
 * @param {string} [config.username] - Database username
 * @param {string} [config.password] - Database password
 * @param {string} [config.host] - Database password
 * @param {string} [config.port] - Database password
 * @param {Object} [config.plugins] - Database plugin creators
 * @param {Object} [config.hooks] - Database hook creators
 * @param {Object} [config.resources] - Database resource classes
 */
class TheDB extends TheDBBase {
  constructor(config = {}) {
    if (!new.target) {
      throw new Error('`TheDB()` must be called with `new`')
    }

    const {
      hooks = {},
      name = uuid(),
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
    const {
      _resources: { TheDBLog },
    } = this
    TheDBLog.prepare({
      filename: resourceLogFile,
    })
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

  defineResource(resourceName, schema = {}, options = {}) {
    const {
      driver,
      env: { dialect },
    } = this
    if (options.indexes) {
      console.warn('[TheDB] use `options.indices` instead of `options.indexes`')
      options.indices = options.indexes
      delete options.indexes
    }
    const {
      cascaded,
      collectionClass,
      entityClass,
      hooks = {},
      indices = [],
      interceptors = {},
      invalidated,
      skipResolvingRefFor,
    } = options
    const { inbound, outbound } = interceptors
    const { onCreate, onDestroy, onDrop, onUpdate } = hooks

    class ResourceClass extends TheResource {
      static get cascaded() {
        return cascaded
      }

      async invalidated(...args) {
        return invalidated(...args)
      }
    }

    const resource = ResourceClass.fromDriver(driver, resourceName, {
      annotates: true,
    })
    resource.policy(parsePolicy(schema))
    if (driver.define) {
      driver.define(resourceName, schema, { indices })
    } else {
      const schemaLess = ['memory'].includes(dialect)
      const shouldWarn = !schemaLess && !/^The/.test(resourceName)
      if (shouldWarn) {
        console.warn(`[TheDB] Schema not defined: ${resourceName}`)
      }
    }

    const wrapActionContext = (actionContext) =>
      Object.assign(actionContext, {
        skipResolvingRefFor: []
          .concat(actionContext.skipResolvingRefFor, skipResolvingRefFor)
          .filter(Boolean),
      })
    this.schemas[resourceName] = schema
    this.indices[resourceName] = indices

    // Wrap inbound
    {
      const { applyInbound } = resource
      const inboundHandler = asBound(inbound)
      resource.applyInbound = async function applyInboundWrap(
        attributesArray,
        actionContext = {},
      ) {
        actionContext = wrapActionContext(actionContext)
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
        // TODO Remove
        for (const entity of entities) {
          entity.id = String(entity.id)
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
    return resource
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
   * @param {function(Object): Object} ResourceFactory - Resource factory
   * @param {string} resourceName - Name of resource
   * @returns {Object} Loaded resource instance
   */
  load(ResourceFactory, resourceName) {
    unlessProduction(() => {
      assert(!!ResourceFactory, `[${resourceName}] ResourceClass is required`)
      assert(
        !isClass(ResourceFactory),
        `[${resourceName}] ResourceFactory should be function, not class`,
      )
    })

    const duplicate = this.hasResource(resourceName)
    if (duplicate) {
      throw new Error(
        `Resource with name "${resourceName}" is already registered!`,
      )
    }

    const resource = ResourceFactory({
      db: this,
      define: (schema, options = {}) =>
        this.defineResource(resourceName, schema, options),
    })

    assert(!!resource, 'Resource factory should return a resource')

    this.setResource(resourceName, resource)
    this.theDBLogEnabled = true
    resource.db = this

    return resource
  }

  /**
   * Load resources from mapping object
   * @param {Object<string, Function>} ResourceMapping - Resource name and factory
   */
  loadFromMapping(ResourceMapping) {
    for (const [as, ResourceFactory] of Object.entries(ResourceMapping)) {
      this.load(ResourceFactory, as)
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
      throw new Error('Already unref')
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
   * @returns {Promise<undefined>}
   */
  async drop() {
    const {
      driver,
      env: { database, dialect, storage },
      resources,
    } = this
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
      throw new Error('[TheDB] drop() is not implemented!')
    }

    for (const resourceName of Object.keys(resources)) {
      await driver.drop(resourceName)
    }
    await asleep(10)
  }

  /**
   * Invalidate entity
   * @param {string} entityRef
   * @returns {Promise<undefined>}
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

    if (driver.prepareIfNeeded) {
      await driver.prepareIfNeeded()
    }
  }

  /**
   * Create transaction
   * @param {?Function} callback
   * @returns {Promise<*>}
   */
  async transaction(callback) {
    const { driver } = this
    if (!driver.transaction) {
      console.warn('[TheDB] transaction() is not implemented!')
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
   * @returns {Promise<boolean>} Success or not
   */
  async updateVersion(version) {
    return this.updateMigrationVersion(version)
  }
}

module.exports = TheDB
