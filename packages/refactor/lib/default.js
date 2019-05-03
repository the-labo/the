/**
 * Alias of {@link module:@the-/refactor.create}
 * @memberof module:@the-/refactor
 * @function default
 */
'use strict'

const create = require('./create')
const TheRefactor = require('./TheRefactor')

const lib = create.bind(create)

// `module.exports` overrides these `exports.*`, but still needs them for lebab (https://github.com/lebab/lebab)
exports.TheRefactor = TheRefactor
exports.create = create

module.exports = Object.assign(lib, {
  TheRefactor,
})
