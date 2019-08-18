'use strict'

const TheRTCClient = require('./TheRTCClient')

/**
 * Create a TheRTCClient instance
 * @memberof module:@the-/rtc-client
 * @function create
 * @param {...*} args
 * @returns {TheRTCClient}
 */
function create(...args) {
  return new TheRTCClient(...args)
}

module.exports = create
