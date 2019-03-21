/**
 * @function execSqlite
 */
'use strict'

const execcli = require('execcli')

async function execSqlite(env, sql, options = {}) {
  const { storage } = env
  return execcli('sqlite3', [storage, sql], options)
}

module.exports = execSqlite
