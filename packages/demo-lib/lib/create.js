/**
 * Create a TheDemoLib instance
 * @function create
 * @param {...*} args
 * @returns {TheDemoLib}
 */
'use strict'

const TheDemoLib = require('./TheDemoLib')

/** @lends create */
function create(...args) {
  return new TheDemoLib(...args)
}

module.exports = create
