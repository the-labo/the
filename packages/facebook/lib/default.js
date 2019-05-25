'use strict'
/**
 * Default exports
 * @module default
 */
const create = require('./create')
const TheFacebook = require('./TheFacebook')

const lib = create.bind(create)

// `module.exports` overrides these `exports.*`, but still needs them for lebab (https://github.com/lebab/lebab)
exports.TheFacebook = TheFacebook
exports.create = create

module.exports = Object.assign(lib, {
  TheFacebook,
  create,
})
