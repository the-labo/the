/**
 * Docker container configurations
 * @namespace Containers
 */
'use strict'

const Local = require('../../Local')
const path = require('path')
const { isMacOS } = require('@the-/check')

module.exports = Object.freeze(
  /** @lends Containers */
  {
    mysql: {
      name: Local.DOCKER_MYSQL_CONTAINER_NAME,
      options: {
        image: 'mysql:5.7.21',
        publish: `${Local.DOCKER_MYSQL_CONTAINER_PORT}:3306`,
      },
    },
    redis: {
      name: Local.DOCKER_REDIS_CONTAINER_NAME,
      options: {
        conf: path.resolve(__dirname, 'redis.conf'),
        image: 'redis:4',
        publish: `${Local.DOCKER_REDIS_CONTAINER_PORT}:6379`,
      },
    },
    nginx: {
      name: Local.DOCKER_NGINX_CONTAINER_NAME,
      options: {
        image: 'nginx:1.13',
        httpPublishPort: Local.DOCKER_NGINX_CONTAINER_PORT,
        staticDir: Local.APP_PUBLIC_DIR,
        template: path.resolve(__dirname, 'nginx.conf.template'),
        env: {
          HOST_IP: isMacOS() ? 'docker.for.mac.localhost' : '172.17.0.1',
          APP_PORT: Local.APP_PORT,
        },
      },
    },
  },
)
