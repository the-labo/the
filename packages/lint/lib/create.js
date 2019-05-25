'use strict'
/**
 * Create a TheLint instance
 * @memberof module:@the-/lint
 * @function create
 * @param {...*} args
 * @returns {TheLint}
 */
const TheLint = require('./TheLint')

/** @lends module:@the-/lint.create */
function create(...args) {
  return new TheLint(...args)
}

module.exports = create
