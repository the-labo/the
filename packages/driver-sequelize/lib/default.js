/**
 * Alias of {@link module:@the-/driver-sequelize}
 * @memberof module:@the-/driver-sequelize
 * @function default
 */
'use strict'

const create = require('./create')
const TheDriverSequelize = require('./TheDriverSequelize')

const lib = create.bind(create)

module.exports = Object.assign(lib, {
  TheDriverSequelize,
  create,
})
