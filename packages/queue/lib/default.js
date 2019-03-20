/**
 * Default exports
 * @memberOf module:@the-/queue
 * @namespace default
 */
'use strict'

const create = require('./create')
const TheQueue = require('./TheQueue')

const lib = create.bind(create)

module.exports = Object.assign(lib, {
  TheQueue,
})
