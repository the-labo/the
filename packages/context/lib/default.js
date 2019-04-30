/**
 * Alias of {@memberOf module:@the-/context
 * @function default
 * @link module:@the-/context.create}
 */
'use strict'

const create = require('./create')
const TheContext = require('./TheContext')

const lib = create.bind(create)

module.exports = Object.assign(lib, {
  TheContext,
  create,
})
