'use strict'

const TheHash = require('./TheHash')

/**
 * Create a TheHash instance
 * @memberof module:@the-/hash
 * @function create
 * @param {...*} args
 * @returns {TheHash}
 */
function create(...args) {
  return new TheHash(...args)
}

module.exports = create
