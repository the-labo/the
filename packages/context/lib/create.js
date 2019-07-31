'use strict'

/**
 * Create a TheContext instance
 * @memberof module:@the-/context
 * @function create
 * @param {...*} args
 * @returns {TheContext}
 */
const TheContext = require('./TheContext')

/** @lends module:@the-/context.create */
function create(...args) {
  return new TheContext(...args)
}

module.exports = create
