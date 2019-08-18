'use strict'

const uuid = require('uuid')

/**
 * Generate new id
 * @memberof module:@the-/util-ui
 * @function newId
 * @param {Object} [options={}] - Optional settings
 * @param {string} [options.prefix-'the'] - Id prefix
 * @returns {string}
 */
function newId(options = {}) {
  const { prefix = 'the' } = options
  return [prefix, uuid.v4()].join('-')
}

module.exports = newId
