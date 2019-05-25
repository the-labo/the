'use strict'
/**
 * Create a TheRTCClient instance
 * @memberof module:@the-/rtc-client
 * @function create
 * @param {...*} args
 * @returns {TheRTCClient}
 */
const TheRTCClient = require('./TheRTCClient')

/** @lends module:@the-/rtc-client.create */
function create(...args) {
  return new TheRTCClient(...args)
}

module.exports = create
