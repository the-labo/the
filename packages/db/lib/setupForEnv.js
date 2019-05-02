/**
 * Do setup for env
 * @memberof module:@the-/db
 * @function setupForEnv
 */
'use strict'

const { toLowerKeys } = require('@the-/util-db')

/** @lends module:@the-/db.setupForEnv */
async function setupForEnv(env) {
  const {
    database,
    dialect = 'memory',
    host,
    password,
    port,
    root_password: rootPassword,
    root_username: rootUsername,
    storage,
    username,
  } = toLowerKeys(env)

  switch (
    String(dialect)
      .toLowerCase()
      .trim()
  ) {
    case 'mongo':
      return require('./setup/setupMongo')({})
    case 'rdb/mysql':
    case 'sequelize/mysql':
    case 'mysql':
      return require('./setup/setupMysql')({
        database,
        host,
        password,
        port,
        rootPassword,
        rootUsername,
        username,
      })
    case 'rdb/sqlite':
    case 'sequelize/sqlite':
    case 'sqlite':
      return require('./setup/setupSqlite')({ storage })
    default:
      break
  }
}

module.exports = setupForEnv
