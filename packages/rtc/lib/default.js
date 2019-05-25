'use strict'
/**
 * Alias of {@link module:@the-/rtc.create}
 * @memberof module:@the-/rtc
 * @function default
 */
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
