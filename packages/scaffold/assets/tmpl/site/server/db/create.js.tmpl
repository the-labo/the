/**
 * Create an db instance
 * @memberof module:server.db
 * @function create
 * @param {Object} [config]
 * @returns {TheDB}
 */
'use strict'

const theDB = require('@the-/db')
const { MysqlConnections } = require('../constants')
const { ResourceMapping } = require('../mappings')

const defaultConfig = {
  database: MysqlConnections.Default.DATABASE,
  dialect: MysqlConnections.Default.DIALECT,
  host: MysqlConnections.Default.HOST,
  password: MysqlConnections.Default.PASSWORD,
  port: MysqlConnections.Default.PORT,
  rootPassword: MysqlConnections.Default.ROOT_PASSWORD,
  rootUsername: MysqlConnections.Default.ROOT_USERNAME,
  username: MysqlConnections.Default.USERNAME,
}

/** @lends module:server.db.create */
function create(config = defaultConfig, options = {}) {
  return theDB({
    resources: ResourceMapping,
    ...config,
  }).unref()
}

create.forTask = () => create(defaultConfig, { enableHooks: false })
create.forTest = () => create({ dialect: 'memory' }, { enableHooks: false })

module.exports = create
