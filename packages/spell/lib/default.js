'use strict'
/**
 * Alias of {@link module:@the-/spell.create}
 * @memberof module:@the-/spell
 * @function default
 */
const create = require('./create')
const TheSpell = require('./TheSpell')
const Words = require('./Words')

const lib = create.bind(create)

// `module.exports` overrides these `exports.*`, but still needs them for lebab (https://github.com/lebab/lebab)
exports.TheSpell = TheSpell
exports.Words = Words
exports.create = create

module.exports = Object.assign(lib, {
  TheSpell,
  Words,
  create,
})
