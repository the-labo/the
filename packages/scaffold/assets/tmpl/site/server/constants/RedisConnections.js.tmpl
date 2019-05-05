/**
 * RedisConnections
 * @memberof module:server.constants
 * @namespace RedisConnections
 */
'use strict'

const { isProduction } = require('@the-/check')
const theHash = require('@the-/hash')
const DockerPorts = require('./DockerPorts')

module.exports = Object.freeze(
  /** @lends module:server.constants.RedisConnections */
  {
    Default: {
      DB: '1',
      HOST: '127.0.0.1',
      PORT: DockerPorts.REDIS_CONTAINER_PORT,
    },
  },
)

if (!isProduction()) {
  module.exports = theHash.proxy(module.exports, {
    name: 'RedisConnections',
    unknownCheck: true,
  })
}
