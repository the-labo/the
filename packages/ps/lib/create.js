'use strict'

/**
 * Create a ThePS instance
 * @memberof module:@the-/ps
 * @function create
 * @param {...*} args
 * @returns {ThePS}
 */
const ThePS = require('./ThePS')

/** @lends module:@the-/ps.create */
function create(...args) {
  return new ThePS(...args)
}

module.exports = create
