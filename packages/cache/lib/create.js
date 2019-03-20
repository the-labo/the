/**
 * Create a TheCache instance
 * @function create
 * @param {...*} args
 * @returns {TheCache}
 */
'use strict'

const TheCache = require('./TheCache')

/** @lends create */
function create(...args) {
  return new TheCache(...args)
}

module.exports = create
