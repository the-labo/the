/**
 * Create a TheStore instance
 * @function create
 * @param {...*} args
 * @returns {TheStore}
 */
'use strict'

const TheStore = require('./TheStore')

/** @lends create */
function create(...args) {
  return new TheStore(...args)
}

module.exports = create
