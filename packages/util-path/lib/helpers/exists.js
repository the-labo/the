'use strict'

/**
 * Check file exists
 * @memberof module:@the-/util-path.helpers
 * @function exists
 * @param {string} filename
 * @returns {Promise<boolean>}
 */
const fs = require('fs')

/** @lends module:@the-/util-path.helpers.exists */
async function exists(filename) {
  return new Promise((resolve) => {
    fs.stat(filename, (err, state) => resolve(!err && !!state))
  })
}

exists.sync = (filename) => {
  try {
    return !!fs.statSync(filename)
  } catch (e) {
    return false
  }
}

module.exports = exists
