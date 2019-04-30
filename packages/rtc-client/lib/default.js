/**
 * Alias of {@memberOf module:@the-/rtc-client
 * @function default
 * @link module:@the-/rtc-client.create}
 */
'use strict'

const create = require('./create')
const TheRTCClient = require('./TheRTCClient')

const lib = create.bind(create)

module.exports = Object.assign(lib, {
  TheRTCClient,
  create,
})
