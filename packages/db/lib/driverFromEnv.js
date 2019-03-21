/**
 * Create driver from env
 * @function driverFromEnv
 */
'use strict'

const mkdirp = require('mkdirp')
const path = require('path')
const { toLowerKeys } = require('the-db-util')
const { isProduction } = require('@the-/check')

/** @lends driverFromEnv */
function driverFromEnv(env) {
  const {
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
  switch (
    String(dialect)
      .toLowerCase()
      .trim()
  ) {
    case 'json':
      return require('clay-driver-json')(storage)
    case 'localstorage':
      return require('clay-driver-localstorage')
    case 'memory':
      return require('clay-driver-memory')()
    case 'mongo':
      return require('the-driver-mongo').create({
        database,
        host,
        password,
        port,
        ssl,
        username,
      })
    case 'mysql':
    case 'sqlite':
      throw new Error(`No longer supported`)
    case 'rdb/mysql':
      return require('the-driver-rdb')({
        database,
        dialect: 'mysql',
        dialectOptions: { ssl },
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
    case 'rdb/sqlite':
      mkdirp.sync(path.dirname(storage))
      return require('the-driver-rdb')({
        database,
        dialect: 'sqlite',
        isolationLevel: 'READ COMMITTED',
        retry: { match: ['SQLITE_BUSY: database is locked'], max: 10 },
        storage,
      })
    case 'sequelize/mysql':
      return require('the-driver-sequelize')({
        database,
        dialect: 'mysql',
        dialectOptions: { ssl },
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
      return require('the-driver-sequelize')({
        database,
        dialect: 'sqlite',
        isolationLevel: 'READ COMMITTED',
        retry: { match: ['SQLITE_BUSY: database is locked'], max: 10 },
        storage,
      })
    default:
      throw new Error(`Unknown dialect: "${dialect}"`)
  }
}

module.exports = driverFromEnv
