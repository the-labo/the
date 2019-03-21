/**
 * Default exports
 * @module default
 */
'use strict'

const create = require('./create')
const helpers = require('./helpers')
const TheSeat = require('./TheSeat')

const lib = create.bind(create)

// `module.exports` overrides these `exports.*`, but still needs them for lebab (https://github.com/lebab/lebab)
exports.TheSeat = TheSeat
exports.create = create
exports.helpers = helpers

module.exports = Object.assign(lib, {
  TheSeat,
})
