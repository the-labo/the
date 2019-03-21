/**
 * Create a TheLint instance
 * @function create
 * @param {...*} args
 * @returns {TheLint}
 */
'use strict'

const TheLint = require('./TheLint')

/** @lends create */
function create(...args) {
  return new TheLint(...args)
}

module.exports = create
