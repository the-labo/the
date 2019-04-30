/**
 * Create a TheServer instance
 * @memberOf module:@the-/server
 * @function create
 * @param {...*} args
 * @returns {TheServer}
 */
'use strict'

const TheServer = require('./TheServer')

/** @lends module:@the-/server.create */
function create(...args) {
  return new TheServer(...args)
}

module.exports = create
