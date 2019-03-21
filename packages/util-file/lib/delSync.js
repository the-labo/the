/**
 * @function delSync
 * @param {string} filename
 */
'use strict'

const fs = require('fs')

/** @lends delSync */
function delSync(filename) {
  try {
    return fs.unlinkSync(filename)
  } catch (e) {
    return null
  }
}

module.exports = delSync
