'use strict'

/**
 * Create a TheAssert instance
 * @memberof module:@the-/assert
 * @function create
 * @param {...*} args
 * @returns {module:@the-/assert.TheAssert}
 */
const TheAssert = require('./TheAssert')

/** @lends module:@the-/assert.create */
function create(...args) {
  return new TheAssert(...args).bind()
}

module.exports = create
