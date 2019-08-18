'use strict'

const TheQueue = require('./TheQueue')

/**
 * Create a TheQueue instance
 * @memberof module:@the-/queue
 * @function create
 * @param {...*} args
 * @returns {TheQueue}
 */
function create(...args) {
  return new TheQueue(...args)
}

module.exports = create
