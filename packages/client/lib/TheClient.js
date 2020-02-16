'use strict'

const cookies = require('browser-cookies')
const { restore, save } = require('bstorage')
const { get } = require('bwindow')
const qs = require('qs')
const { RFuncClient } = require('rfunc-client/shim/browser')
const io = require('socket.io-client')
const uuid = require('uuid')
const { isProduction, unlessProduction } = require('@the-/check-env')
const { ThePack } = require('@the-/pack')
const IOEvents = require('./constants/IOEvents')
const {
  PingSender,
  asController,
  debugController,
  debugStream,
  parseClientUrl,
} = require('./helpers')
const InfoAccess = require('./helpers/InfoAccess')
const logger = require('./helpers/logger')
const RemoteStream = require('./helpers/RemoteStream')
const debug = require('debug')('the:client')

const NAMESPACE = '/rpc'

const { decode, encode } = new ThePack({})

/**
 * @memberof module:@the-/client
 * @class TheClient
 * @augments module:@the-/client.TheClientBase
 * @param {string} url
 * @param {Object} config
 */
class TheClient extends RFuncClient {
  // noinspection ReservedWordAsName
  /**
   * Create the client instance
   * @param {string} namespace
   * @param {Object} [config={}]
   * @returns {TheClient}
   */
  static for(namespace = 'default', config = {}) {
    const key = [TheClient.CID_KEY, namespace].join('/').trim()
    const cid = restore(key) || TheClient.newCID()
    const client = new TheClient({ ...config, cid })
    const isBrowser = !!get('document')
    if (isBrowser) {
      save(key, cid)
      cookies.set(key, cid, {})
    }

    return client
  }

  constructor(url, config) {
    if (arguments.length === 1) {
      config = arguments[0]
      url = null
    }

    if (!url) {
      url = parseClientUrl(config)
    }

    const {
      cid = TheClient.newCID(),
      forceNewSocket = false,
      onGone,
      version = 'unknown',
      ...restOptions
    } = config
    if (!url) {
      throw new Error(
        `[TheClient] Failed to parse urls with args ${JSON.stringify(
          arguments,
        )}`,
      )
    }

    super(url, restOptions)
    this.onGone(onGone)
    const fetch = this.fetch.bind(this)
    this.infoAccess = InfoAccess({ fetch })
    this.pingSender = PingSender({ fetch })
    this._forceNewSocket = forceNewSocket
    this._gone = false
    this._controllers = {}
    this._cid = cid
    this._version = version
    this._socket = null
    this._closed = false
  }

  get cid() {
    return this._cid
  }

  get closed() {
    return this._closed
  }

  get scope() {
    const { _cid: cid, _rpc: rpc, _version: version } = this
    const language = get('navigator.language')
    /** @type {TheClientScope} */
    return {
      callerKey: rpc && rpc.as,
      cid,
      host: get('location.host'),
      lang: language && language.split('-')[0],
      protocol: get('location.protocol'),
      v: version,
      via: 'client',
    }
  }

  get socket() {
    return this._socket
  }

  assertNotClosed() {
    if (this.closed) {
      throw new Error('[TheClient] Already closed!')
    }
  }

  handleCallback(controllerName, handleName, data) {
    const values = decode(data) || []
    const controller = this._controllers[controllerName]
    if (!controller) {
      console.warn(
        `[TheClient] Callback controller not found: ${controllerName}`,
      )
      return
    }

    const callbacks = []
      .concat(controller.callbacks[handleName])
      .filter(Boolean)
    if (callbacks.length === 0) {
      console.warn(
        `[TheClient] Callback controller not found: ${controllerName}`,
      )
      return
    }

    for (const callback of callbacks) {
      unlessProduction(() => {
        logger.logCallbackCall(controllerName, handleName, values)
      })
      callback(...values) // eslint-disable-line
    }
  }

  markAsGone(reason) {
    if (this._gone) {
      return
    }

    this._onGone && this._onGone(reason)
    this._gone = true
  }

  onGone(onGone) {
    this._onGone = onGone
  }

  ping(options = {}) {
    const { pingSender } = this
    return pingSender.ping(options)
  }

  pingPongAnd(callback, options = {}) {
    const { pingSender } = this
    return pingSender.pingPongAnd(callback, options)
  }

  async close() {
    this._closed = true
    const { _socket: socket } = this
    if (socket) {
      socket.close()
    }
  }

  /**
   * Invoke a method
   * @param {string} moduleName
   * @param {string} methodName - Name of method to invoke
   * @param {...*} params - Parameters
   */
  async invoke(moduleName, methodName, ...params) {
    this.assertNotClosed()
    const { cid, socket } = this
    const iid = uuid.v4() // Invocation id

    return new Promise((resolve, reject) => {
      let keptGoneTimer = -1
      let onReturn = (returned) => {
        if (!onReturn) {
          return null
        }

        returned = decode(returned)
        if (returned.iid !== iid) {
          return
        }

        socket.off(IOEvents.RPC_RETURN, onReturn)
        onReturn = null
        onKeep = null
        clearTimeout(keptGoneTimer)
        const { data, errors, ok } = returned
        debug('rpc return', moduleName, methodName, returned)
        if (ok) {
          resolve(data)
        } else {
          const [e] = errors
          reject(e.message || e)
        }
      }
      let onKeep = (kept) => {
        if (!onKeep) {
          return
        }

        kept = decode(kept)
        if (kept.iid !== iid) {
          return
        }

        socket.off(IOEvents.RPC_KEEP, onKeep)
        onKeep = null
        debug('rpc keep', moduleName, methodName)
        clearTimeout(keptGoneTimer)
        const { duration } = kept
        keptGoneTimer = setTimeout(() => {
          // TODO throw error?
          console.error(
            `[TheClient] RPC call seems gone: \`${moduleName}.${methodName}()\``,
          )
        }, duration * 2)
      }
      socket.on(IOEvents.RPC_KEEP, onKeep)
      socket.on(IOEvents.RPC_RETURN, onReturn)

      const encoded = encode({
        cid,
        iid,
        methodName,
        moduleName,
        params,
      })
      socket.binary(true).emit(IOEvents.RPC_CALL, encoded)
      debug('rpc call', moduleName, methodName, params)
    })
  }

  async newSocket() {
    this.assertNotClosed()
    const query = qs.stringify(this.scope)
    const { href: ioURL } = new URL(`${NAMESPACE}?${query}`, this.baseUrl)
    const socket = io(ioURL, {
      forceNew: this._forceNewSocket,
    })
    socket.on('disconnect', (reason) => {
      debug('disconnect', reason)
      if (this.closed) {
        return
      }

      const goneTimer = setTimeout(
        () => this.markAsGone(reason),
        2000 + 2000 * Math.random(),
      )
      const cancelGone = () => {
        debug('cancelGone')
        clearTimeout(goneTimer)
        socket.off('connect', cancelGone)
        socket.off('reconnect', cancelGone)
      }
      socket.once('connect', cancelGone)
      socket.once('reconnect', cancelGone)
      socket.connect()
    })
    await new Promise((resolve, reject) => {
      socket.on('connect', () => {
        debug('connect')
        resolve(socket)
      })
      socket.on('error', (e) => {
        debug('error', e)
        reject(e)
      })
    })
    return socket
  }

  async openStream(name, params) {
    const { socket } = this
    const stream = new RemoteStream(name, socket)
    await stream.open(params)
    return stream
  }

  /**
   * Create an stream to server
   * @param {string} name
   * @param {Object} params - Stream params
   * @param {Object} [options={}] - Optional setting
   * @param {boolean} [options.debug] - With debug mode
   * @returns {*}
   */
  async stream(name, params = {}, options = {}) {
    this.assertNotClosed()
    const isBrowser = !!get('document')
    const { debug = !isProduction() && isBrowser } = options
    if (!this._socket) {
      this._socket = await this.newSocket()
    }

    const stream = await this.openStream(name, params)
    return debug ? debugStream(stream) : stream
  }

  /**
   * Use a controller module
   * @param {string} controllerName - Module name
   * @param {Object} [options={}] - Optional setting
   * @param {boolean} [options.debug] - With debug mode
   * @returns {*}
   */
  async use(controllerName, options = {}) {
    this.assertNotClosed()
    const isBrowser = !!get('document')
    const { debug = !isProduction() && isBrowser } = options
    let controller = this._controllers[controllerName]
    if (!this._socket) {
      this._socket = await this.newSocket()
    }

    if (!controller) {
      const instance = await this.connect(controllerName)
      const spec = await this.describe(controllerName)
      const { cid } = this
      controller = asController(
        instance,
        spec,
        { cid },
        {
          onToggleHandler: (handlerName, enabled) => {
            const { socket } = this
            const event = [
              IOEvents.CLIENT_CALLBACK,
              cid,
              controllerName,
              handlerName,
            ].join('/')
            if (enabled) {
              socket.on(event, (data) => {
                this.handleCallback(controllerName, handlerName, data)
              })
            } else {
              socket.off(event)
            }
          },
        },
      )
      if (debug) {
        controller = debugController(controller)
      }

      this._controllers[controllerName] = controller
    }

    return controller
  }

  /**
   * Use all controller modules
   * @param {Object} [options={}] - Optional setting
   * @returns {Promise<Object>}
   */
  async useAll(options = {}) {
    const serverInfo = await this.infoAccess.serverInfo()
    const controllers = {}
    const { controllers: controllerSpecs } = serverInfo
    for (const { methods, name } of controllerSpecs) {
      this.specs[name] = { methods, name }
      controllers[name] = await this.use(name, options)
    }
    unlessProduction(() => {
      if (typeof Proxy === 'undefined') {
        return controllers
      }

      return new Proxy(controllers, {
        get(target, key) {
          const has = key in target
          if (!has) {
            console.warn(`[TheClient] Unknown controller name: "${key}"`)
          }

          return target[key]
        },
      })
    })
    return controllers
  }
}

TheClient.RPC_ACTOR_NAME = 'rpc'
TheClient.CID_KEY = 'the:cid'

TheClient.newCID = () => uuid.v4()

module.exports = TheClient

/**
 * @typedef {Object} TheClientScope
 * @property {string} cid - Client id
 * @property {string} callerKey
 */
