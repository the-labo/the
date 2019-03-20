/**
 * Default exports
 */
'use strict'

const create = require('./create')
const TheContext = require('./TheContext')

const lib = create.bind(create)

module.exports = Object.assign(lib, {
  TheContext,
  create,
})
