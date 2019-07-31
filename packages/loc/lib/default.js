'use strict'

/**
 * Default exports
 * @memberof module:@the-/loc
 * @function default
 */
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
