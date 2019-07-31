'use strict'

/**
 * @memberof module.module:@the-/util-file
 * @function delSync
 * @param {string} filename
 */
const fs = require('fs')

/** @lends module:@the-/util-file.delSync */
function delSync(filename) {
  try {
    return fs.unlinkSync(filename)
  } catch (e) {
    return null
  }
}

module.exports = delSync
