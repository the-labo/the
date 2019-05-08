/**
 * Find up file
 * @memberof module:@the-/util-path
 * @function findupSync
 * @param {string} filename to find up
 * @param {Object} [options={}] - Optional settings
 * @returns {?string}
 */
'use strict'

const path = require('path')
const exists = require('./helpers/exists')

async function findup(filename, options = {}) {
  const { base = process.cwd() } = options
  let dirname = base
  do {
    const resolved = path.join(dirname, filename)
    if (await exists(resolved)) {
      return resolved
    }
    const parent = path.dirname(dirname)
    if (dirname === parent) {
      return null // Failed to findup
    }
    dirname = parent
  } while (dirname !== '/')
  return null
}

findup.sync = (filename, options = {}) => {
  const { base = process.cwd() } = options
  let dirname = base
  do {
    const resolved = path.join(dirname, filename)
    if (exists.sync(resolved)) {
      return resolved
    }
    const parent = path.dirname(dirname)
    if (dirname === parent) {
      return null // Failed to findup
    }
    dirname = parent
  } while (dirname !== '/')
  return null
}

module.exports = findup
