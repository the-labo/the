/**
 * Default exports
 * @module default
 */
'use strict'

const create = require('./create')
const TheVideoConverter = require('./TheVideoConverter')

const lib = create.bind(create)

module.exports = Object.assign(lib, {
  TheVideoConverter,
  create,
})
