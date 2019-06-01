'use strict'
/**
 * Create a Icon instance
 * @memberof module:@the-/icon
 * @function create
 * @param {...*} args
 * @returns {Icon}
 */
const TheIcon = require('./TheIcon')

/** @lends module:@the-/icon.create */
function create(...args) {
  return new TheIcon(...args)
}

module.exports = create
