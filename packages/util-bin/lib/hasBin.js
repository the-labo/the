/**
 * @memberof module:@the-/util-bin
 * @function hasBin
 * @param {string} binName
 * @returns {Promise<boolean>}
 */
'use strict'

const hasbin = require('hasbin')

/** @lends  module:@the-/util-bin.hasBin */
async function hasBin(binName) {
  return new Promise((resolve) => {
    hasbin(binName, (result) => resolve(result))
  })
}

module.exports = hasBin
