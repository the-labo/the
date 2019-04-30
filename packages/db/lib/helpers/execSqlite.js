/**
 * @memberOf module:@the-/db.helpers
 * @function execSqlite
 */
'use strict'

const execcli = require('execcli')

/** @lends module:@the-/db.helpers.execSqlite */
async function execSqlite(env, sql, options = {}) {
  const { storage } = env
  return execcli('sqlite3', [storage, sql], options)
}

module.exports = execSqlite
