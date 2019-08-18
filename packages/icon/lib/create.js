'use strict'

const TheIcon = require('./TheIcon')

/**
 * Create a Icon instance
 * @memberof module:@the-/icon
 * @function create
 * @param {...*} args
 * @returns {Icon}
 */
function create(...args) {
  return new TheIcon(...args)
}

module.exports = create
