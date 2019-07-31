'use strict'

/**
 * Create a TheMetrics instance
 * @memberof module:@the-/metrics
 * @function create
 * @param {...*} args
 * @returns {TheMetrics}
 */
const TheMetrics = require('./TheMetrics')

/** @lends module:@the-/metrics.create */
function create(...args) {
  return new TheMetrics(...args)
}

module.exports = create
