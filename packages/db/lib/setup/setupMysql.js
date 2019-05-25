'use strict'
/**
 * @memberof module:@the-/db.setup
 * @function setupMysql
 */
const asleep = require('asleep')
const colorprint = require('colorprint')
const execMysql = require('../helpers/execMysql')

/** @lends module:@the-/db.setup.setupMysql */
async function setupMysql(env, options = {}) {
  const { retryInterval = 3000, retryMax = 20 } = options
  const {
    database,
    host = 'localhost',
    password,
    port,
    rootPassword = process.env.ROOT_PASSWORD ||
      process.env.MYSQL_ROOT_PASSWORD ||
      '',
    rootUsername = process.env.ROOT_USERNAME || 'root',
    username,
  } = env

  const setupSQL = _setupSQL(database, username, password)

  const execute = (sql) =>
    execMysql(
      {
        host,
        password: rootPassword,
        port,
        username: rootUsername,
      },
      sql,
    )

  const _waitToSetup = async () => {
    for (let i = 0; i < retryMax; i++) {
      try {
        await execute('SHOW DATABASES')
      } catch (e) {
        switch (e.code) {
          case 'ER_NOT_SUPPORTED_AUTH_MODE':
            throw e
          default:
            console.warn(
              `Setup failed. retry to setup after ${retryInterval}ms ...`,
              e,
            )
            await asleep(retryInterval)
            continue
        }
      }
      break
    }
  }

  colorprint.debug('  Executing SQL...')
  await _waitToSetup()
  colorprint.trace(setupSQL.join('\n'))
  await execute(setupSQL)
  colorprint.debug('  ...SQL done!')
}

function _setupSQL(database, username, password) {
  return [
    `CREATE DATABASE IF NOT EXISTS \`${database}\` DEFAULT CHARACTER SET utf8`,
    `GRANT ALL ON \`${database}\`.* TO \`${username}\` IDENTIFIED BY "${password}"`,
  ]
}

module.exports = setupMysql
