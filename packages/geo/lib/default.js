/**
 * Alias of {@link module:@the-/geo.create}
 * @memberof module:@the-/geo
 * @function default
 */
'use strict'

const create = require('./create')
const TheGeo = require('./TheGeo')

const lib = create.bind(create)

module.exports = Object.assign(lib, {
  TheGeo,
  create,
})
