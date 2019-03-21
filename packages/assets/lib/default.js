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
