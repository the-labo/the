/**
 * Alias of {@link module:@the-/metrics.create}
 * @memberOf module:@the-/metrics
 * @function default
 */
'use strict'

const create = require('./create')
const TheMetrics = require('./TheMetrics')

const lib = create.bind(create)

module.exports = Object.assign(lib, {
  TheMetrics,
  create,
})
