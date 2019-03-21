'use strict'

const create = require('./create')
const TheAsset = require('./TheAsset')
const lib = create.bind(create)

// `module.exports` overrides these `exports.*`, but still needs them for lebab (https://github.com/lebab/lebab)
exports.TheAsset = TheAsset
exports.create = create

module.exports = Object.assign(lib, {
  TheAsset,
  create,
})
