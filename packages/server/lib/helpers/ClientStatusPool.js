'use strict'

const { ClientStatuses } = require('../constants')

function ClientStatusPool() {
  const statusHash = {}
  const keyFor = (cid, socketId) => [cid, socketId].join('@')
  const clientStatusPool = {
    get length() {
      return Object.keys(statusHash).length
    },
    del(cid, socketId) {
      const key = keyFor(cid, socketId)
      delete statusHash[key]
    },
    finalize(cid, socketId) {
      const key = keyFor(cid, socketId)
      statusHash[key] = ClientStatuses.FINALIZING
    },
    get(cid, socketId) {
      const key = keyFor(cid, socketId)
      return statusHash[key]
    },
    init(cid, socketId) {
      const key = keyFor(cid, socketId)
      if (clientStatusPool.length > 1000) {
        console.warn(
          `[TheServer/ClientStatusPool] WARNING! ClientStatusPool size is too large (size: ${clientStatusPool.length}). It possibly causes memory leaks.`,
        )
      }

      statusHash[key] = ClientStatuses.INITIALIZING
    },
    ready(cid, socketId) {
      const key = keyFor(cid, socketId)
      const status = statusHash[key]
      if (status !== ClientStatuses.INITIALIZING) {
        console.warn(
          `[TheServer/ClientStatusPool] WARNING! Client ${key} is not initializing`,
        )
      }

      statusHash[key] = ClientStatuses.READY
    },
  }
  return clientStatusPool
}

module.exports = ClientStatusPool
