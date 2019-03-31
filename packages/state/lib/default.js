/**
 * Default exports
 * @module default
 */
'use strict'

const create = require('./create')
const TheState = require('./TheState')

const lib = create.bind(create)

module.exports = Object.assign(lib, {
  TheState,
  create,
})
