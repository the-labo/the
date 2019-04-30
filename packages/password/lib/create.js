/**
 * Create a ThePassword instance
 * @memberOf module:@the-/password
 * @function create
 * @param {...*} args
 * @returns {ThePassword}
 */
'use strict'

const ThePassword = require('./ThePassword')

/** @lends module:@the-/password.create */
function create(...args) {
  return new ThePassword(...args)
}

module.exports = create
