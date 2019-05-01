/**
 * Mixin for socket
 * @memberof module:@the-/rtc.constants.mixins
 * @function socketMix
 * @param {function} Class
 * @returns {function} Class
 */
'use strict'

const { cleanup } = require('asobj')
const qs = require('qs')
const io = require('socket.io-client')
const debug = require('debug')('the:rtc:client')
const NAMESPACE = '/rtc'

/** @lends module:@the-/rtc.constants.mixins.socketMix */
function socketMix(Class) {
  class SocketMixed extends Class {
    constructor() {
      super(...arguments)
      this.socket = null
    }

    assertHasSocket() {
      if (!this.socket) {
        throw new Error(`[TheRTCClient] Socket not ready`)
      }
    }

    createSocket(url, { forceNew, path, query }) {
      const queryString = qs.stringify(cleanup(query))
      const ioURL = new URL(`${NAMESPACE}?${queryString}`, url).href
      debug('ioURL', ioURL)
      const socket = io(ioURL, {
        forceNew,
        path,
      })
      return socket
    }

    destroySocket() {
      if (!this.socket) {
        return
      }
      this.socket.close()
      this.socket = null
    }

    emitSocketEvent(event, data) {
      this.assertHasSocket()
      this.socket.emit(event, data)
    }

    listenToSocketEvent(event, handler) {
      this.assertHasSocket()
      this.socket.on(event, handler)
    }

    listenToSocketEvents(handlers) {
      for (const [event, handler] of Object.entries(handlers)) {
        this.listenToSocketEvent(event, handler)
      }
    }

    registerSocket(socket) {
      this.socket = socket
    }

    unlistenToSocketEvent(event, handler) {
      this.assertHasSocket()
      this.socket.off(event, handler)
    }

    unlistenToSocketEvents(handlers) {
      for (const [event, handler] of Object.entries(handlers)) {
        this.unlistenToSocketEvent(event, handler)
      }
    }

    async emitSocketEventWithAck(
      event,
      data,
      { failEvent, successEvent } = {},
    ) {
      const { socket } = this
      // TODO timeout
      return new Promise((resolve, reject) => {
        const resolveWrap = (resolved) => {
          socket.off(successEvent, resolveWrap)
          socket.off(failEvent, rejectWrap)
          resolve(resolved)
        }
        const rejectWrap = (rejected) => {
          socket.off(successEvent, resolveWrap)
          socket.off(failEvent, rejectWrap)
          reject(rejected)
        }

        socket.on(successEvent, resolveWrap)
        socket.on(failEvent, rejectWrap)
        socket.emit(event, data)
      })
    }
  }

  return SocketMixed
}

module.exports = socketMix
