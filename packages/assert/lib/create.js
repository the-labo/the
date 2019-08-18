'use strict'

const TheAssert = require('./TheAssert')

/**
 * Create a TheAssert instance
 * @memberof module:@the-/assert
 * @function create
 * @param {...*} args
 * @returns {module:@the-/assert.TheAssert}
 */
function create(...args) {
  return new TheAssert(...args).bind()
}

module.exports = create
