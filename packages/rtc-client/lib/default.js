'use strict'
/**
 * Alias of {@link module:@the-/rtc-client.create}
 * @memberof module:@the-/rtc-client
 * @function default
 */
const create = require('./create')
const TheRTCClient = require('./TheRTCClient')

const lib = create.bind(create)

module.exports = Object.assign(lib, {
  TheRTCClient,
  create,
})
