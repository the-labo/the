/**
 * DockerPorts
 * @memberof module:server.constants
 * @namespace DockerPorts
 */
'use strict'

const { isProduction } = require('@the-/check')
const theHash = require('@the-/hash')
const _seat = require('./_seat')

const DockerPorts = Object.freeze({
  ..._seat(({ portNumberFor }) =>
    /** @lends module:server.constants.DockerPorts */
    ({
      MYSQL_CONTAINER_PORT: portNumberFor('mysql'),
      NGINX_CONTAINER_PORT: portNumberFor('nginx'),
      REDIS_CONTAINER_PORT: portNumberFor('redis'),
    }),
  ),
})

module.exports = DockerPorts

if (!isProduction()) {
  module.exports = theHash.proxy(module.exports, {
    name: 'DockerPorts',
    unknownCheck: true,
  })
}
