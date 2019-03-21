/**
 * Default exports
 * @module default
 */
'use strict'

const create = require('./create')
const TheResize = require('./TheResize')

const lib = create.bind(create)

module.exports = Object.assign(lib, {
  TheResize,
})
