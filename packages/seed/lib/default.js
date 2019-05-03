/**
 * Alias of {@memberof module:@the-/seed
 * @function default
 * @link module:@the-/seed.create}
 */
'use strict'

const create = require('./create')
const TheSeed = require('./TheSeed')

const lib = create.bind(create)

module.exports = Object.assign(lib, {
  TheSeed,
})
