'use strict'

/**
 * Create a TheScope instance
 * @memberof module:@the-/scope
 * @function create
 * @param {...*} args
 * @returns {TheScope}
 */
const TheScope = require('./TheScope')

/** @lends create */
function create(...args) {
  return new TheScope(...args)
}

module.exports = create
