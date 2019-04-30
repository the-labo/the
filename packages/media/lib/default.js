/**
 * Alias of {@function default
 * @link module:@the-/media.create}
 */
'use strict'

const create = require('./create')
const TheMedia = require('./TheMedia')

const lib = create.bind(create)

module.exports = Object.assign(lib, {
  TheMedia,
})
