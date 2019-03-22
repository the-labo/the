/**
 * Default exports
 * @module default
 */
'use strict'

const create = require('./create')
const run = require('./run')
const TheRun = require('./TheRun')

const lib = run.bind(run)

module.exports = Object.assign(lib, {
  TheRun,
  create,
  run,
})