/**
 * Mixin for client
 * @function clientMix
 * @param {function} Class
 * @returns {function} Class
 */
'use strict'

/** @lends clientMix */
function clientMix(Class) {
  class ClientMixed extends Class {
    async getClientConnection(cid, options = {}) {
      const { patiently = false } = options
      const { connectionStore } = this
      if (patiently) {
        return connectionStore.patientlyGet(cid)
      } else {
        return connectionStore.get(cid)
      }
    }

    async hasClientConnection(cid) {
      const connection = await this.getClientConnection(cid)
      return !!connection
    }

    async removeClientSocket(cid, socketId) {
      const connection = await this.connectionStore.get(cid)
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
      await this.connectionStore.set(cid, connection)
    }

    async saveClientSocket(cid, socketId, client) {
      const connection = await this.connectionStore.get(cid)
      const socketIds = (connection && connection.socketIds) || []
      while (socketIds.length > 10) {
        socketIds.shift() // Remove staled socket
      }
      await this.connectionStore.set(cid, {
        cid,
        client,
        socketIds: socketIds.concat(socketId),
      })
    }
  }

  return ClientMixed
}

module.exports = clientMix
