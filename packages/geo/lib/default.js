/**
 * Alias of {@function default
 * @link module:@the-/geo.create}
 */
'use strict'

const create = require('./create')
const TheGeo = require('./TheGeo')

const lib = create.bind(create)

module.exports = Object.assign(lib, {
  TheGeo,
  create,
})
