/**
 * Create a TheCode instance
 * @memberof module:the-code
 * @function create
 * @param {...*} args
 * @returns {TheCode}
 */
'use strict'

const TheCode = require('./TheCode')

/** @lends create */
function create(...args) {
  return new TheCode(...args)
}

module.exports = create
