/**
 * Create a TheHash instance
 * @memberOf module:@the-/hash
 * @function create
 * @param {...*} args
 * @returns {TheHash}
 */
'use strict'

const TheHash = require('./TheHash')

/** @lends module:@the-/hash.create */
function create(...args) {
  return new TheHash(...args)
}

module.exports = create
