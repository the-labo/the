'use strict'

/**
 * Alias of {@link module:@the-/metrics.create}
 * @memberof module:@the-/metrics
 * @function default
 */
const create = require('./create')
const TheMetrics = require('./TheMetrics')

const lib = create.bind(create)

module.exports = Object.assign(lib, {
  TheMetrics,
  create,
})
