/**
 * Alias of {@link module:@the-/hash.create}
 * @memberof module:@the-/hash
 * @function default
 * @returns {module:@the-/hash.TheHash}
 */
'use strict'

const create = require('./create')
const proxy = require('./proxy')
const TheHash = require('./TheHash')

const lib = create.bind(create)

// `module.exports` overrides these `exports.*`, but still needs them for lebab (https://github.com/lebab/lebab)
exports.TheHash = TheHash
exports.create = create

/** @lends theHash */
module.exports = Object.assign(
  lib,
  /** @lends theHash */
  {
    TheHash,
    create,
    proxy,
  },
)
