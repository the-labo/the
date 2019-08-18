'use strict'

const ThePS = require('./ThePS')

/**
 * Create a ThePS instance
 * @memberof module:@the-/ps
 * @function create
 * @param {...*} args
 * @returns {ThePS}
 */
function create(...args) {
  return new ThePS(...args)
}

module.exports = create
