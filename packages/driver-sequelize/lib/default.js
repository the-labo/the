/**
 * Alias of {@link @the-/driver-sequelize}
 * @memberOf @the-/driver-sequelize
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
