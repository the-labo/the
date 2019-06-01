'use strict'
/**
 * Default exports
 * @memberof module:@the-/icon
 * @function icon
 * @returns {Icon}
 */
const create = require('./create')
const TheIcon = require('./TheIcon')

const lib = create.bind(create)

module.exports = Object.assign(
  lib,
  /** @lends module:@the-/icon.icon */
  {
    TheIcon,
    create,
  },
)
