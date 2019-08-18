'use strict'

const TheLint = require('./TheLint')

/**
 * Create a TheLint instance
 * @memberof module:@the-/lint
 * @function create
 * @param {...*} args
 * @returns {TheLint}
 */
function create(...args) {
  return new TheLint(...args)
}

module.exports = create
