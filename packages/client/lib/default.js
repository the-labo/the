/**
 * Default exports
 * @memberOf module:@the-/client
 * @namespace default
 */
'use strict'

const create = require('./create')
const TheClient = require('./TheClient')

const lib = create.bind(create)

// `module.exports` overrides these `exports.*`, but still needs them for lebab (https://github.com/lebab/lebab)
exports.TheClient = TheClient
exports.create = create

module.exports = Object.assign(lib, {
  TheClient,
  create,
})
