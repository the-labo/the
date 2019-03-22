/**
 * Create a TheHandle instance
 * @memberOf module:@the-/handle
 * @function create
 * @param {...*} args
 * @returns {TheHandle}
 */
'use strict'

const TheHandle = require('./TheHandle')

/** @lends create */
function create(...args) {
  return new TheHandle(...args)
}

module.exports = create