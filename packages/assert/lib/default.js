/**
 * Default exports. Alias of {@link module:@the-/assert.create}
 * @memberOf module:@the-/assert
 * @function default
 * @param {...*} args
 * @returns {module:@the-/assert.TheAssert.TheAssert}
 */
'use strict'

const create = require('./create')
const TheAssert = require('./TheAssert')

const lib = create.bind(create)

module.exports = Object.assign(lib, {
  TheAssert,
  create,
})
