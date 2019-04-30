/**
 * Alias of {@memberOf module:@the-/metrics
 * @function default
 * @link module:@the-/metrics.create}
 */
'use strict'

const create = require('./create')
const TheMetrics = require('./TheMetrics')

const lib = create.bind(create)

module.exports = Object.assign(lib, {
  TheMetrics,
  create,
})
