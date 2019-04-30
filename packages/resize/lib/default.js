/**
 * Alias of {@link module:@the-/resize.create}
 * @memberOf module:@the-/resize
 * @function default
 */
'use strict'

const create = require('./create')
const TheResize = require('./TheResize')

const lib = create.bind(create)

module.exports = Object.assign(lib, {
  TheResize,
})
