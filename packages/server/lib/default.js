/**
 * Alias of {@link module:@the-/server.create}
 * @memberof module:@the-/server
 * @function default
 */
'use strict'

const create = require('./create')
const TheServer = require('./TheServer')

const lib = create.bind(create)

module.exports = Object.assign(lib, {
  TheServer,
})
