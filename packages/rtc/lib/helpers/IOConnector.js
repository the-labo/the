'use strict'

const NAMESPACE = '/rtc'

function IOConnector(io) {
  return {
    getNamespace() {
      return io.of(NAMESPACE)
    },
    async broadcastToIORoom(roomName, event, data) {
      const namespace = io.of(NAMESPACE)
      return namespace.in(roomName).emit(event, data)
    },
    async close() {
      // TODO
    },
    async getIORoomState(roomName) {
      const namespace = io.of(NAMESPACE)
      const socketIds = await new Promise((resolve, reject) => {
        namespace
          .in(roomName)
          .clients((err, clients) => (err ? reject(err) : resolve(clients)))
      })
      return {
        clients: socketIds
          .map((socketId) => {
            const socket = namespace.connected[socketId]
            if (!socket) {
              return null
            }

            return { ...socket.theRTCState }
          })
          .filter(Boolean),
        name: roomName,
      }
    },
    async getSocketsFor(rid) {
      return Object.values(io.of(NAMESPACE).connected).filter(
        (socket) => socket.theRTCState && socket.theRTCState.rid === rid,
      )
    },
  }
}

module.exports = IOConnector
