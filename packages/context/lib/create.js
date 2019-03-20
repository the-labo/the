/**
 * Create a TheContext instance
 * @memberof module:@the-/context
 * @function create
 * @param {...*} args
 * @returns {TheContext}
 */
'use strict'

const TheContext = require('./TheContext')

/** @lends create */
function create(...args) {
  return new TheContext(...args)
}

module.exports = create
