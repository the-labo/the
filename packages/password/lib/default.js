/**
 * Alias of {@memberof module:@the-/password
 * @function default
 * @link module:@the-/password}
 */
'use strict'

const create = require('./create')
const ThePassword = require('./ThePassword')

const lib = create.bind(create)

// `module.exports` overrides these `exports.*`, but still needs them for lebab (https://github.com/lebab/lebab)
exports.ThePassword = ThePassword
exports.create = create

module.exports = Object.assign(lib, {
  ThePassword,
  create,
})
