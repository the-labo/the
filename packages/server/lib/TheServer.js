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
const theAssert = require('@the-/assert')
const { unlessProduction } = require('@the-/check')
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
  toControllerDriverFactory,
} = require('./helpers')
const ControllerDriverPool = require('./helpers/ControllerDriverPool')
const InfoFlusher = require('./helpers/InfoFlusher')
const MetricsCounter = require('./helpers/MetricsCounter')
const RPCKeeper = require('./helpers/RPCKeeper')
const { clientMix } = require('./mixins')
const { ConnectionStore, SessionStore } = require('./stores')
const toStreamDriverFactory = require('./streaming/toStreamDriverFactory')
const streamDriverPool = require('./streaming/streamDriverPool')
const debug = require('debug')('the:server')
const assert = theAssert('@the-/server')

const TheServerBase = [clientMix].reduce((C, mix) => mix(C), RFunc)

/** @lends module:@the-/server.TheServer  */
class TheServer extends TheServerBase {
  constructor(config = {}) {
    const {
      cacheDir = theTmp.generateDirSync({ prefix: 'the-server' }).path,
      controllers: Controllers = {},
      endpoints = {},
      html = false,
      info = {},
      infoFile = 'public/the/info.json',
      inject = () => ({}),
      langs = ['en'],
      logFile = 'var/log/the-server.log',
      middlewares = [],
      redis: redisConfig = { db: 1, host: '127.0.0.1', port: '6379' },
      rpcKeepDuration = 1000,
      sessionCleanupInterval = DefaultValues.SESSION_CLEANUP_INTERVAL,
      sessionExpireDuration = DefaultValues.SESSION_EXPIRE_DURATION,
      static: staticDir,
      streams: streamClasses = {},
      ...rest
    } = config
    debug('config', config)
    assert(
      !('scope' in config),
      "config.scope is no longer supported. Use 'config.inject()' instead",
    )
    assert(
      !('injects' in config),
      "config.injects is no longer supported. Use 'config.inject()' instead",
    )
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

    const storage = new ARedis(redisConfig)
    const sessionStore = new SessionStore(storage, {
      cleanupInterval: sessionCleanupInterval,
      expireDuration: sessionExpireDuration,
    })
    const connectionStore = new ConnectionStore(storage)
    const ControllerDriverFactories = toControllerDriverFactory.all(
      Controllers,
      {
        inject,
        sessionStore,
      },
    )
    const prototypeCtx = {}
    const prototypeControllers = Object.assign(
      {},
      ...Object.entries(ControllerDriverFactories).map(
        ([controllerName, ControllerDriverFactory]) => ({
          [controllerName]: ControllerDriverFactory(
            controllerName,
            prototypeCtx,
          ).controller,
        }),
      ),
    )
    const controllerSpecs = Object.entries(prototypeControllers).map(
      ([controllerName, controller]) => ({
        methods: Object.assign(
          {},
          ...Object.keys(controller).map((name) => ({
            [name]: { desc: `${name}` },
          })),
        ),
        name: controllerName,
      }),
    )

    super({
      ...prototypeControllers,
      $endpoints: {
        ...buildInEndpoints,
        ...endpoints,
      },
      $serverMiddlewares: [
        ctxInjector((ctx) => ({
          ...inject(ctx),
          server: this,
        })),
        langDetector(langs),
        ...middlewares,
      ],
      $static: staticDir,
      logFile,
    })
    if (html) {
      const renderer = serversideRendering(html, { cacheDir, inject })
      renderer.clearCacheSync()
      this.app.use(renderer)
    }
    this.additionalInfo = info
    this.ControllerDriverFactories = ControllerDriverFactories
    this.storage = storage
    this.redisConfig = redisConfig
    this.sessionStore = sessionStore
    this.connectionStore = connectionStore
    this.controllerSpecs = controllerSpecs
    this.langs = langs
    this.handleCallback = this.handleCallback.bind(this)
    this.infoFile = infoFile
    this.streamDriverPool = streamDriverPool({})
    this.streamClasses = streamClasses
    this.rpcKeepDuration = rpcKeepDuration
    this.inject = inject
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
    return closed
  }

  async createControllerDriver(controllerName, cid) {
    const ControllerDriverFactory = this.ControllerDriverFactories[
      controllerName
    ]
    if (!ControllerDriverFactory) {
      throw new Error(`[TheServer] Unknown controller: ${controllerName}`)
    }
    if (!cid) {
      throw new Error('[TheServer] cid is required')
    }
    const connection = await this.getClientConnection(cid, { patiently: true })
    if (!connection) {
      throw new Error(`[TheServer] Connection not found for: ${cid}`)
    }
    const { client = { cid } } = connection
    return ControllerDriverFactory(controllerName, {
      callbacks: callbacksProxy({
        client,
        controllerName,
        onCallback: this.handleCallback,
      }),
      client: { ...client, cid },
    })
  }

  /**
   * Destroy all sessions
   * @returns {Promise<number>} Deleted count
   */
  async destroyAllSessions() {
    const { controllerDriverPool, sessionStore } = this
    await controllerDriverPool.each(async (driver) => {
      await driver.reloadSession()
    })
    return sessionStore.delAll()
  }

  async getSessionFor(cid) {
    const { sessionStore } = this
    return (await sessionStore.get(cid)) || {}
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
    const controllerDriverPool = ControllerDriverPool()
    this.controllerDriverPool = controllerDriverPool
    this.metricsCounter = metricsCounter
    const ioConnector = IOConnector(io, {
      connectionStore: this.connectionStore,
      onIOClientCame: async (cid, socketId, client) => {
        await this.saveClientSocket(cid, socketId, client)
        const controllerNames = Object.keys(this.ControllerDriverFactories)
        for (const controllerName of controllerNames) {
          const driver = await this.createControllerDriver(controllerName, cid)
          const { interceptors } = driver
          await driver.reloadSession()
          interceptors.controllerDidAttach()
          metricsCounter.addControllerAttachCount(controllerName, 1)
          await driver.saveSession()
          controllerDriverPool.add(cid, socketId, controllerName, driver)
        }
      },

      onIOClientGone: async (cid, socketId, reason) => {
        const { rpcKeeper } = this
        const hasConnection = await this.hasClientConnection(cid)
        if (!hasConnection) {
          console.warn('[TheServer] Connection already gone for cid:', cid)
        }
        const drivers = controllerDriverPool.getAll(cid, socketId)
        for (const [controllerName, driver] of Object.entries(drivers)) {
          const { interceptors } = driver
          try {
            await driver.reloadSession()
            await interceptors.controllerWillDetach()
            await driver.saveSession()
            metricsCounter.addControllerDetachCount(controllerName, 1)
          } catch (e) {
            console.warn(
              `[TheServer] Failed to cleanup controller ${controllerName}`,
              e,
            )
          }
        }
        this.streamDriverPool.cleanup(cid)
        rpcKeeper.stopKeepTimersFor(cid)

        await this.removeClientSocket(cid, socketId, reason)
      },

      onRPCAbort: async () => {
        // TODO Support aborting RPC Call
      },

      onRPCCall: async (cid, socketId, config) => {
        const { rpcKeeper } = this
        const { iid, methodName, moduleName, params } = config
        const driver = controllerDriverPool.get(cid, socketId, moduleName)
        if (!driver) {
          throw new Error(
            `[@the-/server] Controller not found for name: ${moduleName}`,
          )
        }
        const { controllerName, interceptors } = driver

        rpcKeeper.startKeepTimer(cid, iid, { controllerName })
        await asleep(10 * Math.random())
        let data
        let errors
        await driver.reloadSession()
        try {
          await interceptors.controllerMethodWillInvoke({
            name: methodName,
            params,
          })
          data = await driver.invoke(methodName, params.slice(1))
          await interceptors.controllerMethodDidInvoke({
            name: methodName,
            params,
            result: data,
          })
          await driver.saveSession()
        } catch (e) {
          const error = { ...e }
          delete error.stack
          unlessProduction(() => {
            error.stack = e.stack
          })
          errors = [error]
        } finally {
          rpcKeeper.stopKeepTimerIfNeeded(cid, iid)
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
        const { stream } = this.streamDriverPool.getInstance(cid, sid)
        await stream.push(chunk)
      },

      onStreamClose: async (cid, socketId, config) => {
        await asleep(10)
        const { sid } = config
        const { stream } = this.streamDriverPool.getInstance(cid, sid)
        this.streamDriverPool.delInstance(cid, sid)
        await stream.close()
      },

      onStreamError: async (e) => {
        // TODO
        console.error('[TheServer] Stream error:', e)
      },

      onStreamFin: async (cid, socketId, config) => {
        const { sid } = config
        const exists = this.streamDriverPool.hasInstance(cid, sid)
        if (!exists) {
          // DO nothing if already gone
          return
        }
        const { stream } = this.streamDriverPool.getInstance(cid, sid)
        await stream.pushEnd()
      },

      onStreamOpen: async (cid, socketId, config) => {
        const { params, sid, streamName } = config
        const Class = this.streamClasses[streamName]
        if (!Class) {
          throw new Error(`[TheServer] Unknown stream: ${streamName}`)
        }
        const StreamDriverFactory = toStreamDriverFactory(Class, {
          cid,
          ioConnector,
          sid,
        })
        const { inject } = this
        const streamDriver = StreamDriverFactory({
          ...inject(),
          client: { cid },
          params,
        })
        const { stream } = streamDriver
        stream.streamName = streamName
        stream.sid = sid
        const session = await this.getSessionFor(cid)
        stream.session = new Proxy(session, {
          get: (target, k) => target[k],
          set: () => {
            throw new Error('[TheServer] Cannot update session from stream')
          },
        })
        this.streamDriverPool.setInstance(cid, sid, streamDriver)
        await stream.open()
      },
    })
    this.rpcKeeper = RPCKeeper({
      ioConnector,
      keepDuration: this.rpcKeepDuration,
      metricsCounter,
      sendRPCKeep: (...args) => ioConnector.sendRPCKeep(...args),
    })
    this.ioConnector = ioConnector
    await new Promise((resolve) => server.listen(port, () => resolve())).then(
      () => this,
    )
  }
}

TheServer.Stream = TheStream

module.exports = TheServer
