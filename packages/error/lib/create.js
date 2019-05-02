/**
 * Create a TheError instance
 * @memberof module:@the-/error
 * @function create
 * @param {...*} args
 * @returns {TheError}
 */
'use strict'

const TheError = require('./TheError')

/** @lends create */
function create(...args) {
  return new TheError(...args)
}

module.exports = create
