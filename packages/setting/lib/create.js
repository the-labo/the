'use strict'

/**
 * Create a TheSetting instance
 * @memberof module:@the-/setting
 * @function create
 * @param {...*} args
 * @returns {TheSetting}
 */
const TheSetting = require('./TheSetting')

/** @lends create */
function create(...args) {
  return new TheSetting(...args)
}

module.exports = create
