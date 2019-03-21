/**
 * Create a TheDate instance
 * @memberOf module:@the-/date
 * @function create
 * @param {...*} args
 * @returns {TheDate}
 */
'use strict'

const TheDate = require('./TheDate')

/** @lends create */
function create(...args) {
  return new TheDate(...args)
}

module.exports = create
