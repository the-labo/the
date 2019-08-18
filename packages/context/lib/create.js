'use strict'

const TheContext = require('./TheContext')

/**
 * Create a TheContext instance
 * @memberof module:@the-/context
 * @function create
 * @param {...*} args
 * @returns {TheContext}
 */
function create(...args) {
  return new TheContext(...args)
}

module.exports = create
