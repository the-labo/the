/**
 * Alias of {@memberof module:@the-/tmp
 * @function default
 * @link module:@the-/tmp.create}
 */
'use strict'

const create = require('./create')
const TheTmp = require('./TheTmp')

const lib = create.bind(create)
const singleton = lib()

/** @type {TheTmp} */
module.exports = Object.assign(singleton, {
  TheTmp,
  create,
  singleton,
})
