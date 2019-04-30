/**
 * Alias of {@memberOf module:@the-/rtc
 * @function default
 * @link module:@the-/rtc.create}
 */
'use strict'

const constants = require('./constants')
const create = require('./create')
const TheRTC = require('./TheRTC')

const lib = create.bind(create)

module.exports = Object.assign(lib, {
  TheRTC,
  constants,
  create,
  ...constants,
})
