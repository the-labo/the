/**
 * Alias of {@link module:@the-/video-converter.create}
 * @memberof module:@the-/video-converter
 * @function default
 */
'use strict'

const create = require('./create')
const TheVideoConverter = require('./TheVideoConverter')

const lib = create.bind(create)

module.exports = Object.assign(lib, {
  TheVideoConverter,
  create,
})
