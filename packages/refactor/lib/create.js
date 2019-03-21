/**
 * Create a TheRefactor instance
 * @function create
 * @param {...*} args
 * @returns {TheRefactor}
 */
'use strict'

const TheRefactor = require('./TheRefactor')

/** @lends create */
function create(...args) {
  return new TheRefactor(...args)
}

module.exports = create
