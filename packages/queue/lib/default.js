'use strict'
/**
 * Alias of {@link module:@the-/queue}
 * @memberof module:@the-/queue
 * @function default
 */
const create = require('./create')
const TheQueue = require('./TheQueue')

const lib = create.bind(create)

module.exports = Object.assign(lib, {
  TheQueue,
})
