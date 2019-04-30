/**
 * Default exports. Alias of {@memberOf module:@the-/assets
 * @function default
 * @link module:@the-/assets.create}
 * @param {...*} args
 * @returns {module:@the-/assets.TheAssert.TheAssert}
 */
'use strict'

const create = require('./create')
const TheAssets = require('./TheAssets')
const lib = create.bind(create)

// `module.exports` overrides these `exports.*`, but still needs them for lebab (https://github.com/lebab/lebab)
exports.TheAssets = TheAssets
exports.create = create

module.exports = Object.assign(lib, {
  TheAssets,
  create,
})
