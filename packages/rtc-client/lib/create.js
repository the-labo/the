/**
 * Create a TheRTCClient instance
 * @function create
 * @param {...*} args
 * @returns {TheRTCClient}
 */
'use strict'

const TheRTCClient = require('./TheRTCClient')

/** @lends create */
function create(...args) {
  return new TheRTCClient(...args)
}

module.exports = create
