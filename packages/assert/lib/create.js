/**
 * Create a TheAssert instance
 * @memberOf module:@the-/assert
 * @function create
 * @param {...*} args
 * @returns {module:@the-/assert.TheAssert}
 */
'use strict'

const TheAssert = require('./TheAssert')

/** @lends module:@the-/assert.create */
function create(...args) {
  return new TheAssert(...args).bind()
}

module.exports = create
