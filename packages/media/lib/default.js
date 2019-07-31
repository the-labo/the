'use strict'

/**
 * Alias of {@link module:@the-/media.create}
 * @memberof module:@the-/media
 * @function default
 */
const create = require('./create')
const TheMedia = require('./TheMedia')

const lib = create.bind(create)

module.exports = Object.assign(lib, {
  TheMedia,
})
