'use strict'

/**
 * Create a TheDate instance
 * @memberof module:@the-/date
 * @function create
 * @param {...*} args
 * @returns {TheDate}
 */
const TheDate = require('./TheDate')

/** @lends module:@the-/date.create */
function create(...args) {
  return new TheDate(...args)
}

module.exports = create
