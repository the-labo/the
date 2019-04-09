/**
 * Default exports
 * @module default
 */
'use strict'

const create = require('./create')
const TheRTCClient = require('./TheRTCClient')

const lib = create.bind(create)

module.exports = Object.assign(lib, {
  TheRTCClient,
  create,
})
