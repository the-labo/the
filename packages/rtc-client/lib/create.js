/**
 * Create a TheRTCClient instance
 * @memberOf module:@the-/rtc-client
 * @function create
 * @param {...*} args
 * @returns {TheRTCClient}
 */
'use strict'

const TheRTCClient = require('./TheRTCClient')

/** @lends module:@the-/rtc-client.create */
function create(...args) {
  return new TheRTCClient(...args)
}

module.exports = create
