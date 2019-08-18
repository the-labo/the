'use strict'

const fs = require('fs')

/**
 * Check file exists
 * @memberof module:@the-/util-path.helpers
 * @function exists
 * @param {string} filename
 * @returns {Promise<boolean>}
 */
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
