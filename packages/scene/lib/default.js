/**
 * Alias of {@link module:@the-/scene.create}
 * @function default
 */
'use strict'

const create = require('./create')
const TheScene = require('./TheScene')

const lib = create.bind(create)

// `module.exports` overrides these `exports.*`, but still needs them for lebab (https://github.com/lebab/lebab)
exports.TheScene = TheScene
exports.create = create

module.exports = Object.assign(lib, {
  TheScene,
  create,
})
