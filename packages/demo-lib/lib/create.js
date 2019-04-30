/**
 * Create a TheDemoLib instance
 * @memberOf module:@the-/demo-lib
 * @function create
 * @param {...*} args
 * @returns {TheDemoLib}
 */
'use strict'

const TheDemoLib = require('./TheDemoLib')

/** @lends module:@the-/demo-lib.create */
function create(...args) {
  return new TheDemoLib(...args)
}

module.exports = create
