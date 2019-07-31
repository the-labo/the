'use strict'

/**
 * Alias of {@link module:@the-/run.create}
 * @memberof module:@the-/run
 * @function default
 */
const create = require('./create')
const run = require('./run')
const TheRun = require('./TheRun')

const lib = run.bind(run)

module.exports = Object.assign(lib, {
  TheRun,
  create,
  run,
})
