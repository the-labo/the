/**
 * Default exports
 */
'use strict'

const create = require('./create')
const TheAssert = require('./TheAssert')

const lib = create.bind(create)

module.exports = Object.assign(lib, {
  TheAssert,
  create,
})
