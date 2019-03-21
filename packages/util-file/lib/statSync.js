/**
 * @function statSync
 * @param {string} filename
 */
'use strict'

const fs = require('fs')

/** @lends statSync */
function statSync(filename) {
  try {
    return fs.statSync(filename)
  } catch (e) {
    return null
  }
}

module.exports = statSync
