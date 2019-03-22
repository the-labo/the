/**
 * Default exports
 * @module default
 */
'use strict'

const create = require('./create')
const scopes = require('./scopes')
const TheScope = require('./TheScope')

const lib = create.bind(create)

// `module.exports` overrides these `exports.*`, but still needs them for lebab (https://github.com/lebab/lebab)
exports.scopes = scopes
exports.create = create
exports.TheScope = TheScope

module.exports = Object.assign(lib, {
  TheScope,
  create,
  scopes,
})