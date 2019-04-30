/**
 * Create a TheLint instance
 * @memberOf module:@the-/lint
 * @function create
 * @param {...*} args
 * @returns {TheLint}
 */
'use strict'

const TheLint = require('./TheLint')

/** @lends module:@the-/lint.create */
function create(...args) {
  return new TheLint(...args)
}

module.exports = create
