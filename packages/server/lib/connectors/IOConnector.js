'use strict'

const NAMESPACE = '/rpc'

const asleep = require('asleep')
const { ThePack } = require('@the-/pack')
const { IOEvents } = require('../constants')

const { decode, encode } = new ThePack({})

/**
 * @memberof module:@the-/server.connectors
 * @function IOConnector
 * @returns {*}
 */
function IOConnector(
  io,
  {
    connectionStore,
    onIOClientCame,
    onIOClientGone,
    onRPCAbort,
    onRPCCall,
    onStreamChunk,
    onStreamClose,
    onStreamError,
    onStreamFin,
    onStreamOpen,
  },
) {
  const isIOSocketExists = (socketId) => {
    const namespace = io.of(NAMESPACE)
    return !!namespace.connected[socketId]
  }

  io.of(NAMESPACE).on(IOEvents.CONNECTION, (socket) => {
    const {
      handshake: {
        query: client,
        query: { cid, via },
      },
    } = socket

    if (via === 'client') {
      const { id: socketId } = socket
      void onIOClientCame(cid, socketId, client)
      socket.on(IOEvents.RPC_CALL, (config) => {
        config = decode(config)
        void onRPCCall(cid, socketId, config, { pack: true })
      })
      socket.on(IOEvents.RPC_ABORT, (config) => {
        config = decode(config)
        void onRPCAbort(cid, socketId, config)
      })
      socket.on(IOEvents.DISCONNECT, (reason) => {
        void onIOClientGone(cid, socketId, reason)
      })
      socket.on(IOEvents.STREAM_FIN, (config = {}) => {
        void onStreamFin(cid, socketId, config)
      })
      socket.on(IOEvents.STREAM_OPEN, (config = {}) => {
        onStreamOpen(cid, socketId, config).catch(onStreamError)
        const { sid } = config
        const onChunk = (chunk) => {
          onStreamChunk(cid, socketId, {
            chunk,
            sid,
          }).catch(onStreamError)
        }
        socket.on(`${IOEvents.STREAM_CHUNK}/${sid}`, onChunk)
        const onClose = async (config = {}) => {
          if (config.sid !== sid) {
            return
          }

          await asleep(0) // Next tick
          onStreamClose(cid, socketId, config).catch(onStreamError)
          socket.off(`${IOEvents.STREAM_CHUNK}/${sid}`, onChunk)
          socket.off(IOEvents.STREAM_CLOSE, onClose)
        }
        socket.on(IOEvents.STREAM_CLOSE, onClose)
      })
    }
  })

  const connector = {
    close() {
      io.close()
    },
    async sendRPCError(cid, iid, errors) {
      await connector.sendToIOClient(
        cid,
        IOEvents.RPC_RETURN,
        { errors, iid, ok: false },
        { pack: true },
      )
    },
    async sendRPCKeep(cid, iid, duration) {
      await connector.sendToIOClient(
        cid,
        IOEvents.RPC_KEEP,
        { duration, iid },
        { pack: true },
      )
    },
    async sendRPCSuccess(cid, iid, data) {
      await connector.sendToIOClient(
        cid,
        IOEvents.RPC_RETURN,
        { data, iid, ok: true },
        { pack: true },
      )
    },
    async sendStreamChunk(cid, sid, chunk) {
      await connector.sendToIOClient(
        cid,
        `${IOEvents.STREAM_CHUNK}/${sid}`,
        chunk,
      )
    },
    async sendStreamDidClose(cid, sid) {
      await connector.sendToIOClient(cid, IOEvents.STREAM_DID_CLOSE, { sid })
    },
    async sendStreamDidOpen(cid, sid) {
      await connector.sendToIOClient(cid, IOEvents.STREAM_DID_OPEN, { sid })
    },
    async sendStreamError(cid, sid, error) {
      await connector.sendToIOClient(cid, IOEvents.STREAM_ERROR, { error, sid })
    },
    async sendStreamFin(cid, sid) {
      await connector.sendToIOClient(cid, IOEvents.STREAM_FIN, { sid })
    },
    async sendToIOClient(cid, event, data, options = {}) {
      if (connectionStore.closed) {
        console.warn(
          `[TheServer] Server already closed and filed to send to "${cid}"`,
        )
        return
      }

      const { pack = false, retry = 3 } = options
      const connection = await connectionStore.patientlyGet(cid, {
        interval: 150 + Math.random() * 100,
      })
      if (!connection) {
        console.warn(`[TheServer] Connection lost for cid: ${cid}`)
        return
      }

      const { socketIds = [] } = connection
      if (socketIds.length === 0) {
        return // Already gone
      }

      const namespace = io.of(NAMESPACE)
      const connectedSocketIds = socketIds
        .reverse()
        .filter((socketId) => isIOSocketExists(socketId))
      if (connectedSocketIds.length > 0) {
        // TODO 本当に必要なsocketにだけ送るべき ( 同じブラウザの違うtabでcidが重複してしまう )
        for (const socketId of connectedSocketIds) {
          namespace
            .to(socketId)
            .emit(event, pack ? Buffer.from(encode(data)) : data)
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
        return connector.sendToIOClient(cid, event, data, {
          retry: retry - 1,
        })
      } else {
        console.warn(
          `[TheServer] Gave up to send to "${cid}", whose seems already gone`,
        )
      }
    },
  }
  return connector
}

module.exports = IOConnector
