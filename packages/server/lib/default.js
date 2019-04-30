/**
 * Alias of {@memberOf module:@the-/server
 * @function default
 * @link module:@the-/server.create}
 */
'use strict'

const create = require('./create')
const TheServer = require('./TheServer')

const lib = create.bind(create)

module.exports = Object.assign(lib, {
  TheServer,
})
