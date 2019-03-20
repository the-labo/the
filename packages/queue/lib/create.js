/**
 * Create a TheQueue instance
 * @memberOf module:@the-/queue
 * @function create
 * @param {...*} args
 * @returns {TheQueue}
 */
'use strict'

const TheQueue = require('./TheQueue')

/** @lends create */
function create(...args) {
  return new TheQueue(...args)
}

module.exports = create
