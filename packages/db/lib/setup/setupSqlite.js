'use strict'

const {
  strict: { ok },
} = require('assert')
const mkdirp = require('mkdirp')
const path = require('path')

/**
 * @memberof module:@the-/db.setup
 * @function setupSqlite
 * @param env
 * @param [options={}]
 */
async function setupSqlite(env, options = {}) {
  const { storage } = env
  ok(storage, 'env.STORAGE is required for sqlite.')
  await new Promise((resolve, reject) =>
    mkdirp(path.dirname(storage), (err) => (err ? reject(err) : resolve())),
  )
}

module.exports = setupSqlite
