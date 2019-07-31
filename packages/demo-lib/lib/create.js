'use strict'

/**
 * Create a TheDemoLib instance
 * @memberof module:@the-/demo-lib
 * @function create
 * @param {...*} args
 * @returns {TheDemoLib}
 */
const TheDemoLib = require('./TheDemoLib')

/** @lends module:@the-/demo-lib.create */
function create(...args) {
  return new TheDemoLib(...args)
}

module.exports = create
