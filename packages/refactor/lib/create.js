'use strict'

const TheRefactor = require('./TheRefactor')

/**
 * Create a TheRefactor instance
 * @memberof module:@the-/refactor
 * @function create
 * @param {...*} args
 * @returns {TheRefactor}
 */
function create(...args) {
  return new TheRefactor(...args)
}

module.exports = create
