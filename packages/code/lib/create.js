'use strict'

const TheCode = require('./TheCode')

/**
 * Create a TheCode instance
 * @memberof module:@the-/code
 * @function create
 * @param {...*} args
 * @returns {TheCode}
 */
function create(...args) {
  return new TheCode(...args)
}

module.exports = create
