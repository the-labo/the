'use strict'

const TheHandle = require('./TheHandle')

/**
 * Create a TheHandle instance
 * @memberof module:@the-/handle
 * @function create
 * @param {...*} args
 * @returns {TheHandle}
 */
function create(...args) {
  return new TheHandle(...args)
}

module.exports = create
