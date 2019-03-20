/**
 * Define redis adapter for sockets
 * @function redisAdapter
 */
'use strict'

const asleep = require('asleep')
const { createClient } = require('redis')
const socketIORedis = require('socket.io-redis')

/** @lends redisAdapter */
function redisAdapter(io, options = {}) {
  const key = `the:server:socket.io`
  const { host, port, requestsTimeout } = options
  const pubClient = createClient(options)
  const subClient = createClient(options)
  const adaptor = socketIORedis({
    host,
    key,
    port,
    pubClient,
    requestsTimeout,
    subClient,
  })
  io.adapter(adaptor)

  const close = async () => {
    pubClient.quit()
    subClient.quit()
    await asleep(100)
  }

  return Object.assign(close, { close })
}

module.exports = redisAdapter
