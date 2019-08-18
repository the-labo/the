'use strict'

const TheDemoLib = require('./TheDemoLib')

/**
 * Create a TheDemoLib instance
 * @memberof module:@the-/demo-lib
 * @function create
 * @param {...*} args
 * @returns {TheDemoLib}
 */
function create(...args) {
  return new TheDemoLib(...args)
}

module.exports = create
