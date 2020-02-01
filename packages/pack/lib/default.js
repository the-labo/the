'use strict'

/**
 * Default exports
 * @memberof module:@the-/pack
 * @namespace default
 */
const create = require('./create')
const ThePack = require('./ThePack')

const lib = create({}).bind()

module.exports = Object.assign(lib, {
  ThePack,
  create,
})
