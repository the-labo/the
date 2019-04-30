/**
 * Create a TheTmp instance
 * @memberOf module:@the-/tmp
 * @function create
 * @param {...*} args
 * @returns {TheTmp}
 */
'use strict'

const TheTmp = require('./TheTmp')

/** @lends create */
function create(...args) {
  return new TheTmp(...args)
}

module.exports = create
