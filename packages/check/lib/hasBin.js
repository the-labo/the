/**
 * Check if a bin available
 * @memberof module:@the-/check
 * @function hasBin
 * @param {string} binName - Name of bin
 * @param {Object} [options={}]
 * @returns {Promise.<boolean>}
 */
'use strict'

const fs = require('fs')
const hasbinCB = require('hasbin')
const path = require('path')

/** @lends module:@the-/check.hasBin */
async function hasBin(binName, options = {}) {
  {
    const filename = path.resolve(binName)
    const stat = await new Promise((resolve, reject) => {
      fs.stat(filename, (err, state) => (err ? reject(err) : resolve(state)))
    }).catch(() => null)
    const fileExists = stat && !stat.isDirectory()
    if (fileExists) {
      return true
    }
  }
  return new Promise((resolve) => hasbinCB(binName, resolve))
}

module.exports = hasBin
