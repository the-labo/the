/**
 * Create a TheScope instance
 * @memberOf module:@the-/scope
 * @function create
 * @param {...*} args
 * @returns {TheScope}
 */
'use strict'

const TheScope = require('./TheScope')

/** @lends create */
function create(...args) {
  return new TheScope(...args)
}

module.exports = create
