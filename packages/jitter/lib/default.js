/**
 * Alias of {@lnik module:@the-/jitter.create}
 * @function default
 */
'use strict'

const create = require('./create')
const TheJitter = require('./TheJitter')

const lib = create.bind(create)

module.exports = Object.assign(lib, {
  TheJitter,
  create,
})
