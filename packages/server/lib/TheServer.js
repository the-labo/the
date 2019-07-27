/**
 * HTTP server for the-framework
 * @memberof module:@the-/server
 * @class TheServer
 * @param {Object} config
 * @param {string[]} langs - Supported langs
 * @param {string} logFile - Log file
 * @param {function[]} middlewares - Koa middlewares
 */
'use strict'

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
const buildInEndpoints = require('./buildInEndpoints')
const { IOConnector } = require('./connectors')
const DefaultValues = require('./constants/DefaultValues')
const IOEvents = require('./constants/IOEvents')
const {
  callbacksProxy,
  ctxInjector,
  langDetector,
  serversideRendering,
  streamPool,
  toControllerFactory,
} = require('./helpers')
const ControllerPool = require('./helpers/ControllerPool')
const InfoFlusher = require('./helpers/InfoFlusher')
const MetricsCounter = require('./helpers/MetricsCounter')
const RPCKeeper = require('./helpers/RPCKeeper')
const { clientMix } = require('./mixins')
const { ConnectionStore, SessionStore } = require('./stores')

const debug = require('debug')('the:server')

const TheServerBase = [clientMix].reduce((C, mix) => mix(C), RFunc)

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

      const invalidLang = langs.find((lang) => /^\$/.test(lang))
      if (invalidLang) {
        throw new Error(`[TheServer] Invalid lang: ${invalidLang}`)
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
    const ControllerFactories = toControllerFactory.all({
      controllerClasses,
      sessionCache,
      sessionStore,
    })
    const controllerPrototypeConfig = { app: appScope }
    const controllerModules = Object.assign(
      {},
      ...Object.entries(ControllerFactories).map(
        ([controllerName, ControllerFactory]) => ({
          [controllerName]: ControllerFactory.toModule(
            controllerPrototypeConfig,
          ),
        }),
      ),
    )
    const controllerSpecs = Object.entries(ControllerFactories).map(
      ([controllerName, ControllerFactory]) =>
        ControllerFactory.toSpec(controllerName, controllerPrototypeConfig),
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
    this.ControllerFactories = ControllerFactories
    this.storage = storage
    this.appScope = appScope
    this.redisConfig = redisConfig
    this.sessionStore = sessionStore
    this.sessionCache = sessionCache
    this.connectionStore = connectionStore
    this.controllerInstances = {}
    this.controllerSpecs = controllerSpecs
    this.langs = langs
    this.handleCallback = this.handleCallback.bind(this)
    this.io = null
    this.infoFile = infoFile
    this.streamPool = streamPool({})
    this.streamClasses = streamClasses
    this.rpcKeepDuration = rpcKeepDuration
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
    void this.ioConnector.sendToIOClient(cid, event, values, { pack: true })
  }

  /** Server info */
  info() {
    const { metricsCounter } = this
    return {
      ...(this.additionalInfo || {}),
      alive: !this.closeAt,
      controllers: this.controllerSpecs,
      langs: this.langs,
      metrics: metricsCounter && metricsCounter.counts,
      uptime: new Date() - this.listenAt,
    }
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
    const { infoFlusher, rpcKeeper } = this
    this.closeAt = new Date()
    this.listenAt = null
    void infoFlusher.stopInfoFlush()
    void rpcKeeper.stopAllKeepTimers()
    const closed = await super.close(...args)
    this.connectionStore.closed = true
    await asleep(100) // Wait to flush
    this.ioConnector.close()
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

  async instantiateController(controllerName, cid) {
    const ControllerFactory = this.ControllerFactories[controllerName]
    if (!ControllerFactory) {
      throw new Error(`[TheServer] Unknown controller: ${controllerName}`)
    }
    if (!cid) {
      throw new Error('[TheServer] cid is required')
    }
    if (!this.controllerInstances[controllerName]) {
      this.controllerInstances[controllerName] = {}
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
    const instance = ControllerFactory({
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
    const infoFlusher = InfoFlusher(this.infoFile, () => this.info())
    void infoFlusher.startInfoFlush()
    this.infoFlusher = infoFlusher
    this.closeRedisAdapter = redisAdapter(io, this.redisConfig)
    const metricsCounter = MetricsCounter()
    const controllerPool = ControllerPool()
    this.controllerPool = controllerPool
    this.metricsCounter = metricsCounter
    const ioConnector = IOConnector(io, {
      connectionStore: this.connectionStore,
      onIOClientCame: async (cid, socketId, client) => {
        await this.saveClientSocket(cid, socketId, client)
        const controllerNames = Object.keys(this.ControllerFactories)
        for (const controllerName of controllerNames) {
          const instance = await this.instantiateController(controllerName, cid)
          await instance.reloadSession()
          await instance.controllerDidAttach()
          metricsCounter.addControllerAttachCount(controllerName, 1)
          await instance.saveSession()
          controllerPool.add(cid, socketId, controllerName, instance)
        }
      },

      onIOClientGone: async (cid, socketId, reason) => {
        const { rpcKeeper, sessionCache } = this
        const hasConnection = await this.hasClientConnection(cid)
        if (!hasConnection) {
          console.warn('[TheServer] Connection already gone for cid:', cid)
        }
        sessionCache.del(cid)
        const instances = controllerPool.getAll(cid, socketId)
        for (const [controllerName, instance] of Object.entries(instances)) {
          try {
            await instance.reloadSession()
            await instance.controllerWillDetach()
            await instance.saveSession()
            metricsCounter.addControllerDetachCount(controllerName, 1)
          } catch (e) {
            console.warn(
              `[TheServer] Failed to cleanup controller ${controllerName}`,
              e,
            )
          }
        }
        this.streamPool.cleanup(cid)
        rpcKeeper.stopKeepTimersFor(cid)

        await this.removeClientSocket(cid, socketId, reason)
      },

      onRPCAbort: async () => {
        // TODO Support aborting RPC Call
      },

      onRPCCall: async (cid, socketId, config) => {
        const { rpcKeeper } = this
        const { iid, methodName, moduleName, params } = config
        const instance = controllerPool.get(cid, socketId, moduleName)
        if (!instance) {
          throw new Error(
            `[@the-/server] Controller not found for name: ${moduleName}`,
          )
        }
        const controllerName =
          instance.controllerName || instance.name || moduleName

        rpcKeeper.startKeepTimer(cid, iid, { controllerName })
        await asleep(10 * Math.random())
        let data
        let errors
        this.rpcInvocations[cid] = this.rpcInvocations[cid] || {}
        this.rpcInvocations[cid][iid] = {
          iid,
          methodName,
          moduleName,
          socketId,
        }
        try {
          await instance.reloadSession()
          if (instance.controllerMethodWillInvoke) {
            await instance.controllerMethodWillInvoke({
              name: methodName,
              params,
            })
          }

          data = await instance[methodName](...params.slice(1))
          if (instance.controllerMethodDidInvoke) {
            await instance.controllerMethodDidInvoke({
              name: methodName,
              params,
              result: data,
            })
          }
          await instance.saveSession()
        } catch (e) {
          const error = { ...e }
          delete error.stack
          unlessProduction(() => {
            error.stack = e.stack
          })
          errors = [error]
        } finally {
          rpcKeeper.stopKeepTimerIfNeeded(cid, iid)
          delete this.rpcInvocations[cid][iid]
        }
        if (this.closed) {
          return
        }
        if (errors) {
          await this.ioConnector.sendRPCError(cid, iid, errors)
        } else {
          await this.ioConnector.sendRPCSuccess(cid, iid, data)
        }
      },

      onStreamChunk: async (cid, socketId, config) => {
        const { chunk, sid } = config
        const stream = this.streamPool.getInstance(cid, sid)
        await stream.push(chunk)
      },

      onStreamClose: async (cid, socketId, config) => {
        await asleep(10)
        const { sid } = config
        const stream = this.streamPool.getInstance(cid, sid)
        this.streamPool.delInstance(cid, sid)
        await stream.close()
      },

      onStreamError: async (e) => {
        // TODO
        console.error('[TheServer] Stream error:', e)
      },

      onStreamFin: async (cid, socketId, config) => {
        const { sid } = config
        const exists = this.streamPool.hasInstance(cid, sid)
        if (!exists) {
          // DO nothing if already gone
          return
        }
        const stream = this.streamPool.getInstance(cid, sid)
        await stream.pushEnd()
      },

      onStreamOpen: async (cid, socketId, config) => {
        const { params, sid, streamName } = config
        const Class = this.streamClasses[streamName]
        if (!Class) {
          throw new Error(`[TheServer] Unknown stream: ${streamName}`)
        }

        class Stream extends Class {
          async streamDidCatch(error) {
            const result = await super.streamDidCatch(error)
            void ioConnector.sendStreamError(cid, sid, error)
            return result
          }

          async streamDidOpen() {
            const result = await super.streamDidOpen()
            await ioConnector.sendStreamDidOpen(cid, sid)
            for await (const chunk of this.provider.toGenerator()) {
              await ioConnector.sendStreamChunk(cid, sid, chunk)
            }
            await asleep(10)
            await ioConnector.sendStreamFin(cid, sid)
            return result
          }

          async streamWillClose() {
            const result = await super.streamWillClose()
            await ioConnector.sendStreamDidClose(cid, sid)
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
      },
    })
    const rpcKeeper = RPCKeeper({
      ioConnector,
      keepDuration: this.rpcKeepDuration,
      metricsCounter,
    })
    this.rpcKeeper = rpcKeeper
    this.ioConnector = ioConnector
    await new Promise((resolve) => server.listen(port, () => resolve())).then(
      () => this,
    )
  }
}

TheServer.Ctrl = TheCtrl
TheServer.Stream = TheStream

module.exports = TheServer
