'use strict'
const create = require('./create')
const parsers = require('./parsers')
const processors = require('./processors')
const TheCode = require('./TheCode')

const lib = create.bind(create)

// `module.exports` overrides these `exports.*`, but still needs them for lebab (https://github.com/lebab/lebab)
exports.TheCode = TheCode
exports.parsers = parsers
exports.processors = processors
exports.create = create

module.exports = Object.assign(lib, {
  TheCode,
  create,
  parsers,
  processors,
})
