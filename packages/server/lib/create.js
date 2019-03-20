/**
 * Create a TheServer instance
 * @function create
 * @param {...*} args
 * @returns {TheServer}
 */
'use strict'

const TheServer = require('./TheServer')

/** @lends create */
function create(...args) {
  return new TheServer(...args)
}

module.exports = create
