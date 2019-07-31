'use strict'

/**
 * Create a TheCode instance
 * @memberof module:@the-/code
 * @function create
 * @param {...*} args
 * @returns {TheCode}
 */
const TheCode = require('./TheCode')

/** @lends module:@the-/code.create */
function create(...args) {
  return new TheCode(...args)
}

module.exports = create
