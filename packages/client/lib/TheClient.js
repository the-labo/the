/**
 * @memberOf module:@the-/client
 * @class TheClient
 * @augments module:@the-/client.mixins.infoMix~InfoMixed
 * @augments module:@the-/client.mixins.streamMix~StreamMixed
 * @augments module:@the-/client.TheClientBase
 * @augments module:@the-/client.mixins.pingPongMix~PingPongMixed
 * @param {string} url
 * @param {Object} config
 */
'use strict'

const argx = require('argx')
const cookies = require('browser-cookies')
const { restore, save } = require('bstorage')
const { get } = require('bwindow')
const qs = require('qs')
const { RFuncClient } = require('rfunc-client/shim/browser')
const io = require('socket.io-client')
const uuid = require('uuid')
const { isBrowser, isProduction, unlessProduction } = require('@the-/check')
const { ThePack } = require('@the-/pack')
const IOEvents = require('./constants/IOEvents')
const {
  asController,
  debugController,
  debugStream,
  parseClientUrl,
} = require('./helpers')
const { infoMix, pingPongMix, streamMix } = require('./mixins')
const debug = require('debug')('the:client')
const NAMESPACE = '/rpc'

/**
 * @class module:@the-/client.TheClientBase
 * @protected
 */
const TheClientBase = [pingPongMix, infoMix, streamMix].reduce(
  (Class, mix) => mix(Class),
  RFuncClient,
)

const { decode, encode } = new ThePack({})

/** @lends module:@the-/client.TheClient */
class TheClient extends TheClientBase {
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
    const args = argx(arguments)
    url = args.shift('string')
    config = args.pop('object') || {}
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
    this._onGone = onGone
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
      throw new Error(`[TheClient] Already closed!`)
    }
  }

  handleCallback(controllerName, handleName, data) {
    const values = decode(data)
    const controller = this._controllers[controllerName]
    if (!controller) {
      console.warn(
        `[TheClient] Callback controller not found: ${controllerName}`,
      )
      return
    }
    const callback = controller.callbacks[handleName]
    if (!callback) {
      console.warn(
        `[TheClient] Callback controller not found: ${controllerName}`,
      )
      return
    }
    unlessProduction(() => {
      console.groupCollapsed(
        `[TheClient] Callback \`${controllerName}.${handleName}()\``,
      )
      console.log('Signature', `\`${controllerName}.${handleName}()\``)
      console.log('Arguments', values)
      console.groupEnd()
    })
    callback(...values)
  }

  markAsGone(reason) {
    if (this._gone) {
      return
    }
    this._onGone && this._onGone(reason)
    this._gone = true
  }

  async close() {
    this._closed = true
    const socket = this._socket
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
          const e = errors[0]
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

      socket.emit(
        IOEvents.RPC_CALL,
        encode({
          cid,
          iid,
          methodName,
          moduleName,
          params,
        }),
      )
      debug('rpc call', moduleName, methodName, params)
    })
  }

  async newSocket() {
    this.assertNotClosed()
    const query = qs.stringify(this.scope)
    const ioURL = new URL(`${NAMESPACE}?${query}`, this.baseUrl).href
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
        2 * 1000 + 2 * 1000 * Math.random(),
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
    const { debug = !isProduction() && isBrowser() } = options
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
    const { debug = !isProduction() && isBrowser() } = options
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
    const serverInfo = await this.serverInfo()
    const controllers = {}
    const controllerSpecs = serverInfo.controllers
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
 * @property {string} callerKey
 * @property {string} cid - Client id
 * @typedef {Object} TheClientScope
 */
