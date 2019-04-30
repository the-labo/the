/**
 * Alias of {@function default
 * @link module:@the-/resource.create}
 */
'use strict'

const create = require('./create')
const DataTypes = require('./DataTypes')
const isResourceClass = require('./isResourceClass')
const TheResource = require('./TheResource')

const lib = create.bind(create)

module.exports = Object.assign(lib, {
  DataTypes,
  TheResource,
  isResourceClass,
})
