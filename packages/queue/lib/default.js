/**
 * Alias of {@link module:@the-/queue}
 * @memberOf module:@the-/queue
 * @function default
 */
'use strict'

const create = require('./create')
const TheQueue = require('./TheQueue')

const lib = create.bind(create)

module.exports = Object.assign(lib, {
  TheQueue,
})
