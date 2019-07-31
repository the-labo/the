'use strict'

/**
 * Create a ThePassword instance
 * @memberof module:@the-/password
 * @function create
 * @param {...*} args
 * @returns {ThePassword}
 */
const ThePassword = require('./ThePassword')

/** @lends module:@the-/password.create */
function create(...args) {
  return new ThePassword(...args)
}

module.exports = create
