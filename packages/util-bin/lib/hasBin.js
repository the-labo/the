/**
 * @memberof module:@the-/util-bin
 * @function hasBin
 * @param {string} binName
 * @returns {Promise<boolean>}
 */
'use strict'

const hasbin = require('hasbin')
const { EOL } = require('os')

/** @lends  module:@the-/util-bin.hasBin */
async function hasBin(binName) {
  return new Promise((resolve) => {
    hasbin(binName, (result) => resolve(result))
  })
}

hasBin.orThrow = async function hasBinOrThrow(binName, options = {}) {
  const { guide = null, prefix = 'hasBin' } = options
  const has = await hasBin(binName)
  if (has) {
    return
  }

  const message = [
    `[${prefix}] command not found: ${binName}`,
    guide ? `( ${guide} )` : null,
  ]
    .filter(Boolean)
    .join(EOL)
  const error = new Error(message)
  throw error
}

module.exports = hasBin
