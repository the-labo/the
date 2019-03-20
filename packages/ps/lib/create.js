/**
 * Create a ThePS instance
 * @memberOf module:@the-/ps
 * @function create
 * @param {...*} args
 * @returns {ThePS}
 */
'use strict'

const ThePS = require('./ThePS')

/** @lends create */
function create(...args) {
  return new ThePS(...args)
}

module.exports = create
