/**
 * Create a ThePassword instance
 * @function create
 * @param {...*} args
 * @returns {ThePassword}
 */
'use strict'

const ThePassword = require('./ThePassword')

/** @lends create */
function create(...args) {
  return new ThePassword(...args)
}

module.exports = create
