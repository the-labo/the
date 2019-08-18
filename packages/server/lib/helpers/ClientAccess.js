'use strict'

/**
 * Mixin for client
 * @memberof module:@the-/server.helpers
 * @function ClientAccess
 * @param {Object} config
 * @returns {Object} Instance
 */
function ClientAccess({ connectionStore }) {
  /**
   * @memberof module:@the-/server.helpers.ClientAccess
   * @inner
   * @namespace clientAccess
   */
  const clientAccess = {
    async getClientConnection(cid, options = {}) {
      const { patiently = false } = options
      if (patiently) {
        return connectionStore.patientlyGet(cid)
      } else {
        return connectionStore.get(cid)
      }
    },
    async hasClientConnection(cid) {
      const connection = await clientAccess.getClientConnection(cid)
      return !!connection
    },
    async removeClientSocket(cid, socketId) {
      const connection = await connectionStore.get(cid)
      if (!connection) {
        console.warn('[TheServer] Connection already gone', { cid })
        return
      }

      const socketIds = connection.socketIds || []
      if (!socketIds.includes(socketId)) {
        // Already gone
        return
      }

      connection.socketIds = socketIds.filter((f) => f !== socketId)
      await connectionStore.set(cid, connection)
    },
    async saveClientSocket(cid, socketId, client) {
      const connection = await connectionStore.get(cid)
      const socketIds = (connection && connection.socketIds) || []
      while (socketIds.length > 10) {
        socketIds.shift() // Remove staled socket
      }
      await connectionStore.set(cid, {
        cid,
        client,
        socketIds: socketIds.concat(socketId),
      })
    },
  }

  Object.freeze(clientAccess)

  return clientAccess
}

module.exports = ClientAccess
