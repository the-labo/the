/**
 * Default exports
 * @memberOf module:@the-/loc
 * @function default
 */
'use strict'

const create = require('./create')
const TheLoc = require('./TheLoc')

const lib = create.bind(create)

// `module.exports` overrides these `exports.*`, but still needs them for lebab (https://github.com/lebab/lebab)
exports.TheLoc = TheLoc
exports.create = create

module.exports = Object.assign(lib, {
  TheLoc,
  create,
})
