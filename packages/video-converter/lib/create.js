/**
 * Create a TheVideoConverter instance
 * @function create
 * @param {...*} args
 * @returns {TheVideoConverter}
 */
'use strict'

const TheVideoConverter = require('./TheVideoConverter')

/** @lends create */
function create(...args) {
  return new TheVideoConverter(...args)
}

module.exports = create
