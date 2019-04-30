/**
 * Alias of {@memberOf module:@the-/seal
 * @function default
 * @link module:@the-/seal.create}
 */
'use strict'

const create = require('./create')
const TheSeal = require('./TheSeal')

const lib = create.bind(create)

// `module.exports` overrides these `exports.*`, but still needs them for lebab (https://github.com/lebab/lebab)
exports.TheSeal = TheSeal
exports.create = create

module.exports = Object.assign(lib, {
  TheSeal,
  create,
})
