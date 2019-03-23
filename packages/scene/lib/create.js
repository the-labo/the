/**
 * Create a TheScene instance
 * @function create
 * @param {...*} args
 * @returns {TheScene}
 */
'use strict'

const TheScene = require('./TheScene')

/** @lends create */
function create(...args) {
  return new TheScene(...args)
}

module.exports = create
