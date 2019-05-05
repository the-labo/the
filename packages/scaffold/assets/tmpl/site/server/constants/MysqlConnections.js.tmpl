/**
 * MysqlConnections
 * @memberof module:server.constants
 * @namespace MysqlConnections
 */
'use strict'

const { snakecase } = require('stringcase')
const { isProduction } = require('@the-/check')
const theHash = require('@the-/hash')
const DockerPorts = require('./DockerPorts')
const Project = require('./Project')
const SecretValues = require('./secret/SecretValues')

const MysqlConnections = Object.freeze(
  /** @lends module:server.constants.MysqlConnections */
  {
    Default: {
      ...(isProduction()
        ? {
            DATABASE: `${snakecase(Project.SHORT_NAME)}`,
            DIALECT: 'sequelize/mysql',
            HOST: SecretValues['DB_HOST'],
            PASSWORD: SecretValues['DB_PASSWORD'],
            PORT: SecretValues['DB_PORT'],
            ROOT_PASSWORD: SecretValues['DB_ROOT_PASSWORD'],
            ROOT_USERNAME: SecretValues['DB_ROOT_USERNAME'],
            USERNAME: SecretValues['DB_USERNAME'],
          }
        : {
            DATABASE: `${snakecase(Project.SHORT_NAME)}_dev`,
            DIALECT: 'sequelize/mysql',
            HOST: '0.0.0.0',
            PASSWORD: `${snakecase(Project.SHORT_NAME)}_dev`,
            PORT: DockerPorts.MYSQL_CONTAINER_PORT,
            ROOT_PASSWORD: 'root',
            ROOT_USERNAME: 'root',
            USERNAME: `${snakecase(Project.SHORT_NAME)}_dev`,
          }),
    },
  },
)

module.exports = MysqlConnections

if (!isProduction()) {
  module.exports = theHash.proxy(module.exports, {
    name: 'MysqlConnections',
    unknownCheck: true,
  })
}
