'use strict'

const ThePassword = require('./ThePassword')

/**
 * Create a ThePassword instance
 * @memberof module:@the-/password
 * @function create
 * @param {...*} args
 * @returns {ThePassword}
 */
function create(...args) {
  return new ThePassword(...args)
}

module.exports = create
