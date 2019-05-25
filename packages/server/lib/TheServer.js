'use strict'
/**
 * HTTP server for the-framework
 * @memberof module:@the-/server
 * @class TheServer
 * @augments IOMixed
 * @param {Object} config
 * @param {string[]} langs - Supported langs
 * @param {string} logFile - Log file
 * @param {function[]} middlewares - Koa middlewares
 */
const { ARedis } = require('aredis')
const asleep = require('asleep')
const http = require('http')
const { RFunc } = require('rfunc')
const socketIO = require('socket.io')
const theCache = require('@the-/cache')
const { unlessProduction } = require('@the-/check')
const { TheCtrl } = require('@the-/controller')
const { TheStream } = require('@the-/stream')
const theTmp = require('@the-/tmp')
const { redisAdapter } = require('./adapters')
const asControllerModule = require('./asControllerModule')
const buildInEndpoints = require('./buildInEndpoints')
const DefaultValues = require('./constants/DefaultValues')
const IOEvents = require('./constants/IOEvents')
const { callbacksProxy, toControllerModuleBind } = require('./helpers')
const {
  controllerSpecsFor,
  ctxInjector,
  langDetector,
  serversideRendering,
  streamPool,
} = require('./helpers')
const { clientMix, infoMix, ioMix, keepMix, metricsMix } = require('./mixins')
const { ConnectionStore, SessionStore } = require('./stores')
const debug = require('debug')('the:server')

const TheServerBase = [ioMix, infoMix, metricsMix, keepMix, clientMix].reduce(
  (C, mix) => mix(C),
  RFunc,
)

const asAppScope = (...values) => {
  const appScope = Object.assign({}, ...values, {})
  return Object.freeze(appScope)
}

/** @lends module:@the-/server.TheServer  */
class TheServer extends TheServerBase {
  constructor(config = {}) {
    const {
      cacheDir = theTmp.generateDirSync({ prefix: 'the-server' }).path,
      controllers: controllerClasses = {},
      endpoints = {},
      html = false,
      info = {},
      infoFile = 'public/the/info.json',
      injectors = {},
      langs = ['en'],
      logFile = 'var/log/the-server.log',
      middlewares = [],
      redis: redisConfig = { db: 1, host: '127.0.0.1', port: '6379' },
      rpcKeepDuration = 1000,
      scope = {},
      sessionCleanupInterval = DefaultValues.SESSION_CLEANUP_INTERVAL,
      sessionExpireDuration = DefaultValues.SESSION_EXPIRE_DURATION,
      static: staticDir,
      streams: streamClasses = {},
      ...rest
    } = config
    debug('config', config)

    unlessProduction(() => {
      const restKeys = Object.keys(rest)
      if (restKeys.length > 0) {
        console.warn(`[TheServer] Unknown config: ${JSON.stringify(restKeys)}`)
      }
    })

    const appScope = asAppScope({ config }, scope)
    const storage = new ARedis(redisConfig)
    const sessionStore = new SessionStore(storage, {
      cleanupInterval: sessionCleanupInterval,
      expireDuration: sessionExpireDuration,
    })
    const connectionStore = new ConnectionStore(storage)
    const sessionCache = theCache({
      max: 10000,
      maxAge: 1000 * 30,
    })
    const instantiateController = (controllerName, cid) =>
      this.instantiateController(controllerName, cid)
    const ControllerModuleBinds = toControllerModuleBind.all({
      controllerClasses,
      instantiateController,
      sessionCache,
      sessionStore,
    })
    const controllerInstances = Object.assign(
      {},
      ...Object.entries(controllerClasses).map(([name]) => ({
        [name]: {},
      })),
    )
    const controllerModules = Object.assign(
      {},
      ...Object.entries(controllerClasses).map(([name, Class]) => ({
        [name]: asControllerModule(Class, {
          controllerName: name,
          describeController(controllerName) {
            const ControllerModuleBind = ControllerModuleBinds[controllerName]
            if (!ControllerModuleBind) {
              throw new Error(
                `[TheServer] Unknown controller: ${controllerName}`,
              )
            }
            return ControllerModuleBind.describe({ app: appScope })
          },
          instantiateController,
        }),
      })),
    )

    super({
      ...controllerModules,
      $endpoints: {
        ...buildInEndpoints,
        ...endpoints,
      },
      $serverMiddlewares: [
        ctxInjector({
          ...injectors,
          server: () => this,
        }),
        langDetector(langs),
        ...middlewares,
      ],
      $static: staticDir,
      logFile,
    })
    if (html) {
      const renderer = serversideRendering(html, { appScope, cacheDir })
      renderer.clearCacheSync()
      this.app.use(renderer)
    }
    this.additionalInfo = info
    this.ControllerModuleBinds = ControllerModuleBinds
    this.storage = storage
    this.appScope = appScope
    this.redisConfig = redisConfig
    this.sessionStore = sessionStore
    this.sessionCache = sessionCache
    this.connectionStore = connectionStore
    this.controllerInstances = controllerInstances
    this.controllerModules = controllerModules
    this.controllerSpecs = controllerSpecsFor(controllerModules)
    this.langs = langs
    this.handleCallback = this.handleCallback.bind(this)
    this.io = null
    this.infoFile = infoFile
    this.streamPool = streamPool({})
    this.streamClasses = streamClasses
    this.setKeepDuration(rpcKeepDuration)
    this.rpcInvocations = {}
  }

  get closed() {
    return !!this.closeAt
  }

  handleCallback({
    cid,
    controller: controllerName,
    name: handlerName,
    values,
  }) {
    const event = [
      IOEvents.CLIENT_CALLBACK,
      cid,
      controllerName,
      handlerName,
    ].join('/')
    void this.sendToIOClient(cid, event, values, { pack: true })
  }

  async cleanupController(cid, controllerName) {
    const instance = await this.instantiateController(controllerName, cid)
    await instance.reloadSession()
    await instance.controllerWillDetach()
    await instance.saveSession()
    delete this.controllerInstances[controllerName][cid]
  }

  /**
   * Close server
   * @param {...*} args - Close arguments
   * @returns {Promise<*>}
   */
  async close(...args) {
    if (this.closeAt) {
      throw new Error('[TheServer] Already closed')
    }
    this.closeAt = new Date()
    this.listenAt = null
    void this.stopInfoFlush()
    void this.stopAllKeepTimers()
    const closed = await super.close(...args)
    this.connectionStore.closed = true
    await asleep(100) // Wait to flush
    this.io.close()
    if (this.closeRedisAdapter) {
      await this.closeRedisAdapter()
    }
    await this.storage.quit()
    this.io = null
    return closed
  }

  /**
   * Destroy all sessions
   * @returns {Promise<number>} Deleted count
   */
  async destroyAllSessions() {
    const { sessionStore } = this
    return sessionStore.delAll()
  }

  async getSessionFor(cid) {
    const { sessionCache, sessionStore } = this
    const cached = await sessionCache.get(cid)
    return cached || (await sessionStore.get(cid)) || {}
  }

  /** @override */
  async handleIOClientCame(cid, socketId, client) {
    await this.saveClientSocket(cid, socketId, client)
    for (const { name: controllerName } of this.controllerSpecs) {
      const instance = await this.instantiateController(controllerName, cid)
      await instance.reloadSession()
      await instance.controllerDidAttach()
      this.addControllerAttachCountMetrics(controllerName, 1)
      await instance.saveSession()
    }
  }

  /** @override */
  async handleIOClientGone(cid, socketId, reason) {
    const { sessionCache } = this
    const hasConnection = await this.hasClientConnection(cid)
    if (!hasConnection) {
      console.warn('[TheServer] Connection already gone for cid:', cid)
    }
    sessionCache.del(cid)
    for (const { name: controllerName } of this.controllerSpecs) {
      try {
        await this.cleanupController(cid, controllerName)
        this.addControllerDetachCountMetrics(controllerName, 1)
      } catch (e) {
        console.warn(
          `[TheServer] Failed to cleanup controller ${controllerName}`,
          e,
        )
      }
    }
    this.streamPool.cleanup(cid)
    this.stopKeepTimersFor(cid)

    await this.removeClientSocket(cid, socketId, reason)
  }

  /** @override */
  async handleIORPCAbort() {
    // TODO Support aborting RPC Call
  }

  /** @override */
  async handleIORPCCall(cid, socketId, config) {
    const { iid, methodName, moduleName, params } = config
    const controller = this.controllerModules[moduleName]
    const controllerName =
      controller.controllerName || controller.name || moduleName
    this.startKeepTimer(cid, iid, { controllerName })
    await asleep(10 * Math.random())
    let data, errors
    this.rpcInvocations[cid] = this.rpcInvocations[cid] || {}
    this.rpcInvocations[cid][iid] = { iid, methodName, moduleName, socketId }
    try {
      data = await controller[methodName](...params)
    } catch (e) {
      const error = { ...e }
      delete error.stack
      unlessProduction(() => {
        error.stack = e.stack
      })
      errors = [error]
    } finally {
      this.stopKeepTimerIfNeeded(cid, iid)
      delete this.rpcInvocations[cid][iid]
    }
    if (this.closed) {
      return
    }
    if (errors) {
      await this.sendIORPCError(cid, iid, errors)
    } else {
      await this.sendIORPCSuccess(cid, iid, data)
    }
  }

  /** @override */
  async handleIOStreamChunk(cid, socketId, config) {
    const { chunk, sid } = config
    const stream = this.streamPool.getInstance(cid, sid)
    await stream.push(chunk)
  }

  /** @override */
  async handleIOStreamClose(cid, socketId, config) {
    await asleep(10)
    const { sid } = config
    const stream = this.streamPool.getInstance(cid, sid)
    this.streamPool.delInstance(cid, sid)
    await stream.close()
  }

  /** @override */
  async handleIOStreamFin(cid, socketId, config) {
    const { sid } = config
    const exists = this.streamPool.hasInstance(cid, sid)
    if (!exists) {
      // DO nothing if already gone
      return
    }
    const stream = this.streamPool.getInstance(cid, sid)
    await stream.pushEnd()
  }

  /** @override */
  async handleIOStreamOpen(cid, socketId, config) {
    const { params, sid, streamName } = config
    const Class = this.streamClasses[streamName]
    if (!Class) {
      throw new Error(`[TheServer] Unknown stream: ${streamName}`)
    }

    const server = this

    class Stream extends Class {
      async streamDidCatch(error) {
        const result = await super.streamDidCatch(error)
        void server.sendIOStreamError(cid, sid, error)
        return result
      }

      async streamDidOpen() {
        const result = await super.streamDidOpen()
        await server.sendIOStreamDidOpen(cid, sid)
        for await (const chunk of this.provider.toGenerator()) {
          await server.sendIOStreamChunk(cid, sid, chunk)
        }
        await asleep(10)
        await server.sendIOStreamFin(cid, sid)
        return result
      }

      async streamWillClose() {
        const result = await super.streamWillClose()
        await server.sendIOStreamDidClose(cid, sid)
        return result
      }
    }

    const { appScope } = this
    const stream = new Stream({
      app: appScope,
      client: { cid },
      params,
    })
    stream.streamName = streamName
    stream.sid = sid
    const session = await this.getSessionFor(cid)
    stream.session = new Proxy(session, {
      get: (target, k) => target[k],
      set: () => {
        throw new Error('[TheServer] Cannot update session from stream')
      },
    })
    this.streamPool.setInstance(cid, sid, stream)
    await stream.open()
  }

  async instantiateController(controllerName, cid) {
    const ControllerModuleBind = this.ControllerModuleBinds[controllerName]
    if (!ControllerModuleBind) {
      throw new Error(`[TheServer] Unknown controller: ${controllerName}`)
    }
    if (!cid) {
      throw new Error('[TheServer] cid is required')
    }
    const known = this.controllerInstances[controllerName][cid]
    if (known) {
      return known
    }
    const { appScope } = this
    const connection = await this.getClientConnection(cid, { patiently: true })
    if (!connection) {
      throw new Error(`[TheServer] Connection not found for: ${cid}`)
    }
    const { client = { cid } } = connection
    const instance = new ControllerModuleBind({
      app: appScope,
      callbacks: callbacksProxy({
        client,
        controllerName,
        onCallback: this.handleCallback,
      }),
      client: { ...client, cid },
      name: controllerName,
      session: null,
    })
    this.controllerInstances[controllerName][cid] = instance
    return instance
  }

  /**
   * Listen to port
   * @param {number} port - Port to listen
   * @returns {Promise<undefined>}
   */
  async listen(port) {
    if (this.listenAt) {
      throw new Error('[TheServer] Already listening')
    }
    this.listenAt = new Date()
    this.closeAt = null
    const server = http.createServer(this.app.callback())
    this.server = server
    const io = socketIO(server)
    void this.startInfoFlush(this.infoFile)
    this.closeRedisAdapter = redisAdapter(io, this.redisConfig)
    this.registerIO(io)
    await new Promise((resolve) => server.listen(port, () => resolve())).then(
      () => this,
    )
  }
}

TheServer.Ctrl = TheCtrl
TheServer.Stream = TheStream

module.exports = TheServer
