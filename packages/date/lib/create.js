'use strict'

const TheDate = require('./TheDate')

/**
 * Create a TheDate instance
 * @memberof module:@the-/date
 * @function create
 * @param {...*} args
 * @returns {TheDate}
 */
function create(...args) {
  return new TheDate(...args)
}

module.exports = create
