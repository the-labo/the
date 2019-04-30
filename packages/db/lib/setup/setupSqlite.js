/**
 * @memberOf module:@the-/db.setup
 * @function setupSqlite
 */
'use strict'

const { ok } = require('assert')
const mkdirp = require('mkdirp')
const path = require('path')

/** @lends module:@the-/db.setup.setupSqlite */
async function setupSqlite(env, options = {}) {
  const { storage } = env
  ok(storage, 'env.STORAGE is required for sqlite.')
  await new Promise((resolve, reject) =>
    mkdirp(path.dirname(storage), (err) => (err ? reject(err) : resolve())),
  )
}

module.exports = setupSqlite
