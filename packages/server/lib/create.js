'use strict'
/**
 * Create a TheServer instance
 * @memberof module:@the-/server
 * @function create
 * @param {...*} args
 * @returns {TheServer}
 */
const TheServer = require('./TheServer')

/** @lends module:@the-/server.create */
function create(...args) {
  return new TheServer(...args)
}

module.exports = create
