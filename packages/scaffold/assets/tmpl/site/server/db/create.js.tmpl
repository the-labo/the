/**
 * Create an db instance
 * @function create
 * @returns {TheDB}
 */
'use strict'

const theDB = require('@the-/db')
const { ResourceMapping } = require('../mappings')
const Local = require('../../Local')

const defaultConfig = {
  database: Local.DB_DATABASE,
  dialect: Local.DB_DIALECT,
  host: Local.DB_HOST,
  password: Local.DB_PASSWORD,
  port: Local.DB_PORT,
  rootPassword: Local.DB_ROOT_PASSWORD,
  rootUsername: Local.DB_ROOT_USERNAME,
  username: Local.DB_USERNAME,
}

/** @lends create */
function create(config = defaultConfig, options = {}) {
  return theDB({
    resources: ResourceMapping,
    ...config,
  }).unref()
}

create.forTask = () => create(defaultConfig, { enableHooks: false })
create.forTest = () => create({ dialect: 'memory' }, { enableHooks: false })

module.exports = create
