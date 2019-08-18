'use strict'

const execcli = require('execcli')

/**
 * @memberof module:@the-/db.helpers
 * @function execSqlite
 * @param env
 * @param sql
 * @param [options={}]
 * @returns {Promise<*>}
 */
async function execSqlite(env, sql, options = {}) {
  const { storage } = env
  return execcli('sqlite3', [storage, sql], options)
}

module.exports = execSqlite
