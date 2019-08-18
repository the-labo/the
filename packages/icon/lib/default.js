'use strict'

const create = require('./create')
const TheIcon = require('./TheIcon')
const Themes = require('./Themes')

const lib = create.bind(create)

module.exports = Object.assign(
  lib,
  /**
   * Default exports
   * @memberof module:@the-/icon
   * @function icon
   * @returns {Icon}
   */
  {
    TheIcon,
    Themes,
    create,
  },
)
