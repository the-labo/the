/**
 * Alias of {@function default
 * @link module:@the-/lint.create}
 */
'use strict'

const create = require('./create')
const TheLint = require('./TheLint')

const lib = create.bind(create)

// `module.exports` overrides these `exports.*`, but still needs them for lebab (https://github.com/lebab/lebab)
exports.TheLint = TheLint
exports.create = create

module.exports = Object.assign(lib, {
  TheLint,
  create,
})
