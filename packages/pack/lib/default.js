/**
 * Default exports
 * @memberOf module:@the-/pack
 * @namespace default
 */
'use strict'

const Converters = require('./Converters')
const create = require('./create')
const ThePack = require('./ThePack')

const lib = create({}).bind()

module.exports = Object.assign(lib, {
  Converters,
  ThePack,
  create,
})
