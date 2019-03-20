/**
 * Docker container configurations
 * @namespace Containers
 */
'use strict'

const Local = require('../../Local')
const path = require('path')
const { isMacOS } = require('the-check')

module.exports = Object.freeze(
  /** @lends Containers */
  {
    mysql: {
      name: Local.MYSQL_CONTAINER_NAME,
      options: {
        image: 'mysql:5.7.21',
        publish: `${Local.MYSQL_CONTAINER_PORT}:3306`,
      },
    },
    redis: {
      name: Local.REDIS_CONTAINER_NAME,
      options: {
        conf: path.resolve(__dirname, 'redis.conf'),
        image: 'redis:4',
        publish: `${Local.REDIS_CONTAINER_PORT}:6379`
      }
    },
    nginx: {
      name: Local.NGINX_CONTAINER_NAME,
      options: {
        image: 'nginx:1.13',
        httpPublishPort: Local.NGINX_CONTAINER_PORT,
        template: path.resolve(__dirname, 'nginx.conf.template'),
        env: {
          HOST_IP: isMacOS() ? 'docker.for.mac.localhost' : '172.17.0.1',
          APP_PORT: Local.APP_PORT
        }
      }
    }
  }
)
