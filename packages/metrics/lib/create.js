'use strict'

const TheMetrics = require('./TheMetrics')

/**
 * Create a TheMetrics instance
 * @memberof module:@the-/metrics
 * @function create
 * @param {...*} args
 * @returns {TheMetrics}
 */
function create(...args) {
  return new TheMetrics(...args)
}

module.exports = create
