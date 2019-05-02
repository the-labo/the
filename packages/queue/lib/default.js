/**
 * Alias of {@memberof module:@the-/queue
 * @function default
 * @link module:@the-/queue}
 */
'use strict'

const create = require('./create')
const TheQueue = require('./TheQueue')

const lib = create.bind(create)

module.exports = Object.assign(lib, {
  TheQueue,
})
