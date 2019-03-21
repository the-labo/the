/**
 * Default exports
 * @module default
 */
'use strict'

const create = require('./create')
const helpers = require('./helpers')
const TheDB = require('./TheDB')

const lib = create.bind(create)

module.exports = Object.assign(lib, {
  TheDB,
  helpers,
})
