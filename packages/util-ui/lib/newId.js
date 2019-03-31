/**
 * Generate new id
 * @function newId
 * @param {Object} [options={}] - Optional settings
 * @param {string} [options.prefix-'the'] - Id prefix
 * @returns {string}
 */
'use strict'

const uuid = require('uuid')

/** @lends newId */
function newId(options = {}) {
  const { prefix = 'the' } = options
  return [prefix, uuid.v4()].join('-')
}

module.exports = newId
