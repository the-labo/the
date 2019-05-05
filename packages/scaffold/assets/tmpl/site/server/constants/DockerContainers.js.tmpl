/**
 * DockerContainers
 * @memberof module:server.constants
 * @namespace DockerContainers
 */
'use strict'

const { isProduction } = require('@the-/check')
const theHash = require('@the-/hash')
const _seat = require('./_seat')
const Project = require('./Project')

/** @lends module:server.constants.DockerContainers */
const DockerContainers = _seat(({ containerNameFor }) => ({
  MYSQL_CONTAINER_NAME: containerNameFor(`${Project.SHORT_NAME}-mysql`),
  NGINX_CONTAINER_NAME: containerNameFor(`${Project.SHORT_NAME}-nginx`),
  REDIS_CONTAINER_NAME: containerNameFor(`${Project.SHORT_NAME}-redis`),
}))

module.exports = DockerContainers

if (!isProduction()) {
  module.exports = theHash.proxy(module.exports, {
    name: 'DockerContainers',
    unknownCheck: true,
  })
}
