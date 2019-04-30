/**
 * Alias of {@memberOf @the-/driver-sequelize
 * @function default
 * @link @the-/driver-sequelize}
 */
'use strict'

const create = require('./create')
const TheDriverSequelize = require('./TheDriverSequelize')

const lib = create.bind(create)

module.exports = Object.assign(lib, {
  TheDriverSequelize,
  create,
})
