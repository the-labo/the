'use strict'

const { v4: uuid } = require('uuid')

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
  return [prefix, uuid()].join('-')
}

module.exports = newId
