/**
 * Alias of {@memberof module:@the-/resize
 * @function default
 * @link module:@the-/resize.create}
 */
'use strict'

const create = require('./create')
const TheResize = require('./TheResize')

const lib = create.bind(create)

module.exports = Object.assign(lib, {
  TheResize,
})
