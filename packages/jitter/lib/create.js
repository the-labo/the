'use strict'

const TheJitter = require('./TheJitter')

/**
 * Create a TheJitter instance
 * @memberof module:@the-/jitter
 * @function create
 * @param {...*} args
 * @returns {TheJitter}
 */
function create(...args) {
  return new TheJitter(...args)
}

module.exports = create
