'use strict'

/**
 * Create a TheHandle instance
 * @memberof module:@the-/handle
 * @function create
 * @param {...*} args
 * @returns {TheHandle}
 */
const TheHandle = require('./TheHandle')

/** @lends module:@the-/handle.create */
function create(...args) {
  return new TheHandle(...args)
}

module.exports = create
