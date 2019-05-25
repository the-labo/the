'use strict'
/**
 * Alias of {@link module:@the-/jitter.create}
 * @memberof module:@the-/jitter
 * @function default
 */
const create = require('./create')
const TheJitter = require('./TheJitter')

const lib = create.bind(create)

module.exports = Object.assign(lib, {
  TheJitter,
  create,
})
