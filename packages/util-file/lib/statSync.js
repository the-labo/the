'use strict'
/**
 * @memberof module:@the-/util-file
 * @function statSync
 * @param {string} filename
 */
const fs = require('fs')

/** @lends module:@the-/util-file.statSync */
function statSync(filename) {
  try {
    return fs.statSync(filename)
  } catch (e) {
    return null
  }
}

module.exports = statSync
