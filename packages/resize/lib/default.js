'use strict'
/**
 * Alias of {@link module:@the-/resize.create}
 * @memberof module:@the-/resize
 * @function default
 */
const create = require('./create')
const TheResize = require('./TheResize')

const lib = create.bind(create)

module.exports = Object.assign(lib, {
  TheResize,
})
