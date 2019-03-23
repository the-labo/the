/**
 * Data types
 * @module DataTypes
 */
'use strict'

const { DataTypes } = require('clay-constants')
const { isProduction } = require('@the-/check')
const { TheHash } = require('@the-/hash')

module.exports = DataTypes

if (!isProduction()) {
  module.exports = new TheHash(module.exports).toProxy({
    name: 'DataTypes',
    unknownCheck: true,
  })
}
