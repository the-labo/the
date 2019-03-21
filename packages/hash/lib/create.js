/**
 * Create a TheHash instance
 * @function create
 * @param {...*} args
 * @returns {TheHash}
 */
'use strict'

const TheHash = require('./TheHash')

/** @lends create */
function create(...args) {
  return new TheHash(...args)
}

module.exports = create
