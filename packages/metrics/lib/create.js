/**
 * Create a TheMetrics instance
 * @function create
 * @param {...*} args
 * @returns {TheMetrics}
 */
'use strict'

const TheMetrics = require('./TheMetrics')

/** @lends create */
function create(...args) {
  return new TheMetrics(...args)
}

module.exports = create
