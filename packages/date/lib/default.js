/**
 * Default exports
 * @memberOf module:@the-/date
 * @function default
 * @returns {TheDate}
 */
'use strict'

const create = require('./create')
const Durations = require('./Durations')
const TheDate = require('./TheDate')

const lib = create.bind(create)

module.exports = Object.assign(lib, {
  Durations,
  TheDate,
  create,
})