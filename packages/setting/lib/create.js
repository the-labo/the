/**
 * Create a TheSetting instance
 * @memberOf module:@the-/setting
 * @function create
 * @param {...*} args
 * @returns {TheSetting}
 */
'use strict'

const TheSetting = require('./TheSetting')

/** @lends create */
function create(...args) {
  return new TheSetting(...args)
}

module.exports = create
