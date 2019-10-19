'use strict'

const create = require('./create')
const TheDemoLib = require('./TheDemoLib')

const lib = create.bind(create)

module.exports = Object.assign(
  lib,
  /**
   * Default exports
   * @memberof module:@the-/demo-lib
   * @function theDemoLib
   * @returns {TheDemoLib}
   */
  {
    TheDemoLib,
    create,
  },
)
