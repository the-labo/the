'use strict'
/**
 * Mixins for IO
 * @memberof module:@the-/server.mixins
 * @function ioMix
 * @param {function()} Class
 * @returns {function()} Class
 */
const asleep = require('asleep')
const { Converters: ThePackConverters, ThePack } = require('@the-/pack')
const { IOEvents } = require('../constants')
const NAMESPACE = '/rpc'

const { decode, encode } = new ThePack({
  converter: ThePackConverters.NoopConverter,
})

/** @lends module:@the-/server.mixins.ioMix */
function ioMix(Class) {
  /**
   * @memberof module:@the-/server.mixins.ioMix
   * @inner
   * @class IOMixed
   */
  class IOMixed extends Class {
    isIOSocketExists(socketId) {
      const namespace = this.io.of(NAMESPACE)
      return !!namespace.connected[socketId]
    }

    registerIO(io) {
      io.of(NAMESPACE).on(IOEvents.CONNECTION, (socket) => {
        const client = socket.handshake.query
        const { cid, via } = client
        if (via === 'client') {
          const socketId = socket.id
          void this.handleIOClientCame(cid, socketId, client)
          socket.on(IOEvents.RPC_CALL, (config) => {
            config = decode(config)
            void this.handleIORPCCall(cid, socketId, config, { pack: true })
          })
          socket.on(IOEvents.RPC_ABORT, (config) => {
            config = decode(config)
            void this.handleIORPCAbort(cid, socketId, config)
          })
          socket.on(IOEvents.DISCONNECT, (reason) => {
            void this.handleIOClientGone(cid, socketId, reason)
          })
          socket.on(IOEvents.STREAM_FIN, (config = {}) => {
            void this.handleIOStreamFin(cid, socketId, config)
          })
          socket.on(IOEvents.STREAM_OPEN, (config = {}) => {
            this.handleIOStreamOpen(cid, socketId, config).catch(
              this.handleIOStreamError,
            )
            const { sid } = config
            const onChunk = (chunk) => {
              this.handleIOStreamChunk(cid, socketId, {
                chunk,
                sid,
              }).catch(this.handleIOStreamError)
            }
            socket.on(`${IOEvents.STREAM_CHUNK}/${sid}`, onChunk)
            const onClose = async (config = {}) => {
              if (config.sid !== sid) {
                return
              }
              await asleep(0) // Next tick
              this.handleIOStreamClose(cid, socketId, config).catch(
                this.handleIOStreamError,
              )
              socket.off(`${IOEvents.STREAM_CHUNK}/${sid}`, onChunk)
              socket.off(IOEvents.STREAM_CLOSE, onClose)
            }
            socket.on(IOEvents.STREAM_CLOSE, onClose)
          })
        }
      })
      this.io = io
    }

    async handleIOClientCame(cid, socketId, client) {
      // Should be overridden
    }

    async handleIOClientGone(cid, socketId, reason) {
      // Should be overridden
    }

    async handleIORPCAbort(cid, socketId, config) {
      // Should be overridden
    }

    async handleIORPCCall(cid, socketId, config) {
      // Should be overridden
    }

    async handleIOStreamChunk(cid, socketId, config) {
      // Should be overridden
    }

    async handleIOStreamClose(cid, socketId, config) {
      // Should be overridden
    }

    async handleIOStreamError(e) {
      // TODO
      console.error('[TheServer] Stream error:', e)
    }

    async handleIOStreamFin(cid, socketId, config) {
      // Should be overridden
    }

    async handleIOStreamOpen(cid, socketId, config) {
      // Should be overridden
    }

    async sendIORPCError(cid, iid, errors) {
      await this.sendToIOClient(
        cid,
        IOEvents.RPC_RETURN,
        { errors, iid, ok: false },
        { pack: true },
      )
    }

    async sendIORPCKeep(cid, iid, duration) {
      await this.sendToIOClient(
        cid,
        IOEvents.RPC_KEEP,
        { duration, iid },
        { pack: true },
      )
    }

    async sendIORPCSuccess(cid, iid, data) {
      await this.sendToIOClient(
        cid,
        IOEvents.RPC_RETURN,
        { data, iid, ok: true },
        { pack: true },
      )
    }

    async sendIOStreamChunk(cid, sid, chunk) {
      await this.sendToIOClient(cid, `${IOEvents.STREAM_CHUNK}/${sid}`, chunk)
    }

    async sendIOStreamDidClose(cid, sid) {
      await this.sendToIOClient(cid, IOEvents.STREAM_DID_CLOSE, { sid })
    }

    async sendIOStreamDidOpen(cid, sid) {
      await this.sendToIOClient(cid, IOEvents.STREAM_DID_OPEN, { sid })
    }

    async sendIOStreamError(cid, sid, error) {
      await this.sendToIOClient(cid, IOEvents.STREAM_ERROR, { error, sid })
    }

    async sendIOStreamFin(cid, sid) {
      await this.sendToIOClient(cid, IOEvents.STREAM_FIN, { sid })
    }

    async sendToIOClient(cid, event, data, options = {}) {
      if (this.closed) {
        console.warn(
          `[TheServer] Server already closed and filed to send to "${cid}"`,
        )
        return
      }
      const { pack = false, retry = 3 } = options
      const connection = await this.connectionStore.patientlyGet(cid, {
        interval: 150 + Math.random() * 100,
      })
      if (!connection) {
        console.warn(`[TheServer] Connection lost for cid: ${cid}`)
        return
      }
      const { io } = this
      const { socketIds = [] } = connection
      if (socketIds.length === 0) {
        return // Already gone
      }
      const namespace = io.of(NAMESPACE)
      const connectedSocketIds = socketIds
        .reverse()
        .filter((socketId) => this.isIOSocketExists(socketId))
      if (connectedSocketIds.length > 0) {
        // TODO 本当に必要なsocketにだけ送るべき ( 同じブラウザの違うtabでcidが重複してしまう )
        for (const socketId of connectedSocketIds) {
          namespace.to(socketId).emit(event, pack ? encode(data) : data)
        }
        return // Send done
      }
      const shouldRetry = retry > 0
      if (shouldRetry) {
        // Wait and retry
        const sleepMs = parseInt(Math.random() * 1000)
        console.warn(
          `[TheServer] Failed to send to "${cid}" (socketIds: ${socketIds.join(
            ',',
          )}, retry: ${retry}) and retry in ${sleepMs}ms`,
        )
        await asleep(sleepMs)
        return this.sendToIOClient(cid, event, data, {
          retry: retry - 1,
        })
      } else {
        console.warn(
          `[TheServer] Gave up to send to "${cid}", whose seems already gone`,
        )
      }
    }
  }

  return IOMixed
}

module.exports = ioMix
