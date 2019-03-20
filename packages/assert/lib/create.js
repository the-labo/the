/**
 * Create a TheAssert instance
 * @function create
 * @param {...*} args
 * @returns {TheAssert}
 */
'use strict'

const TheAssert = require('./TheAssert')

/** @lends create */
function create(...args) {
  return new TheAssert(...args).bind()
}

module.exports = create
