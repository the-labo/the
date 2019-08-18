'use strict'

const { toLowerKeys } = require('@the-/util-db')

/**
 * Do exec for env
 * @memberof module:@the-/db
 * @function execForEnv
 * @param env
 * @param sql
 * @returns {Promise<*>}
 */
async function execForEnv(env, sql) {
  const {
    database,
    dialect = 'memory',
    host,
    password,
    port,
    storage,
    username,
  } = toLowerKeys(env)

  switch (
    String(dialect)
      .toLowerCase()
      .trim()
  ) {
    case 'rdb/mysql':
    case 'sequelize/mysql':
    case 'mysql':
      return require('./helpers/execMysql')(
        {
          database,
          host,
          password,
          port,
          username,
        },
        sql,
      )
    case 'rdb/sqlite':
    case 'sequelize/sqlite':
    case 'sqlite':
      return require('./helpers/execSqlite')(
        {
          database,
          storage,
        },
        sql,
      )
    default:
      throw new Error(`Exec not implemented for dialect: ${dialect}`)
  }
}

module.exports = execForEnv
