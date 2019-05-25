'use strict'
/**
 * Alias of {@link module:@the-/resource.create}
 * @memberof module:@the-/resource
 * @function default
 */
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
