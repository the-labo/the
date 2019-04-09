/**
 * Default exports
 * @module default
 */
'use strict'

const constants = require('./constants')
const create = require('./create')
const TheRTC = require('./TheRTC')

const lib = create.bind(create)

module.exports = Object.assign(lib, {
  TheRTC,
  constants,
  create,
  ...constants,
})
