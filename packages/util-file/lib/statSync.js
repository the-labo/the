'use strict'

const fs = require('fs')

/**
 * @memberof module:@the-/util-file
 * @function statSync
 * @param {string} filename
 * @returns {*}
 */
function statSync(filename) {
  try {
    return fs.statSync(filename)
  } catch (e) {
    return null
  }
}

module.exports = statSync
