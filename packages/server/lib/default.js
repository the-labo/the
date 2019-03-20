/**
 * Default exports
 * @module default
 */
'use strict'

const create = require('./create')
const TheServer = require('./TheServer')

const lib = create.bind(create)

module.exports = Object.assign(lib, {
  TheServer,
})
