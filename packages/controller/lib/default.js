/**
 * Default exports
 * @module default
 */
'use strict'

const create = require('./create')
const TheCtrl = require('./TheCtrl')

const lib = create.bind(create)

// `module.exports` overrides these `exports.*`, but still needs them for lebab (https://github.com/lebab/lebab)
exports.TheCtrl = TheCtrl
exports.create = create

module.exports = Object.assign(lib, {
  TheCtrl,
})
