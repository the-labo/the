'use strict'

/**
 * Create a TheJitter instance
 * @memberof module:@the-/jitter
 * @function create
 * @param {...*} args
 * @returns {TheJitter}
 */
const TheJitter = require('./TheJitter')

/** @lends module:@the-/jitter.create */
function create(...args) {
  return new TheJitter(...args)
}

module.exports = create
