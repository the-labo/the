'use strict'

const TheServer = require('./TheServer')

/**
 * Create a TheServer instance
 * @memberof module:@the-/server
 * @function create
 * @param {...*} args
 * @returns {TheServer}
 */
function create(...args) {
  return new TheServer(...args)
}

module.exports = create
