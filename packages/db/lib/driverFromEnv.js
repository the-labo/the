'use strict'

const mkdirp = require('mkdirp')
const path = require('path')
const { isProduction } = require('@the-/check-env')
const { toLowerKeys } = require('@the-/util-db')

/**
 * Create driver from env
 * @memberof module:@the-/db
 * @function driverFromEnv
 * @param env
 * @param options
 * @returns {*}
 */
function driverFromEnv(env, options = {}) {
  const {
    charset,
    collate,
    database,
    dialect = 'memory',
    host,
    password,
    pool_idle: poolIdle = isProduction() ? 10000 : 1000,
    pool_max: poolMax = 10,
    pool_min: poolMin = 0,
    port,
    ssl = false,
    storage,
    username,
  } = toLowerKeys(env)
  const { enableLegacyEncoding = false } = options
  switch (String(dialect).toLowerCase().trim()) {
    case 'json':
      return require('clay-driver-json')(storage)
    case 'memory':
      return require('clay-driver-memory')()
    case 'mysql':
    case 'sqlite':
      throw new Error('No longer supported')
    case 'sequelize/mysql':
      return require('@the-/driver-sequelize')({
        charset,
        collate,
        database,
        dialect: 'mysql',
        dialectOptions: { ssl },
        enableLegacyEncoding,
        host,
        password,
        pool: {
          idle: poolIdle,
          max: poolMax,
          min: poolMin,
        },
        port,
        ssl,
        username,
      })
    case 'sequelize/sqlite':
      mkdirp.sync(path.dirname(storage))
      return require('@the-/driver-sequelize')({
        charset,
        collate,
        database,
        dialect: 'sqlite',
        enableLegacyEncoding,
        isolationLevel: 'READ COMMITTED',
        retry: { match: ['SQLITE_BUSY: database is locked'], max: 10 },
        storage,
      })
    default:
      throw new Error(`Unknown dialect: "${dialect}"`)
  }
}

module.exports = driverFromEnv
