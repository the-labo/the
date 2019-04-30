/**
 * Create a TheMetrics instance
 * @memberOf module:@the-/metrics
 * @function create
 * @param {...*} args
 * @returns {TheMetrics}
 */
'use strict'

const TheMetrics = require('./TheMetrics')

/** @lends module:@the-/metrics.create */
function create(...args) {
  return new TheMetrics(...args)
}

module.exports = create
