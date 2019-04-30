/**
 * Default exports
 * @memberof module:@the-/demo-lib
 * @function theDemoLib
 * @returns {TheDemoLib}
 */
'use strict'

const create = require('./create')
const TheDemoLib = require('./TheDemoLib')

const lib = create.bind(create)

module.exports = Object.assign(
  lib,
  /** @lends theDemoLib */
  {
    TheDemoLib,
    create,
  },
)
