/**
 * Create a TheRefactor instance
 * @memberof module:@the-/refactor
 * @function create
 * @param {...*} args
 * @returns {TheRefactor}
 */
'use strict'

const TheRefactor = require('./TheRefactor')

/** @lends module:@the-/refactor.create */
function create(...args) {
  return new TheRefactor(...args)
}

module.exports = create
