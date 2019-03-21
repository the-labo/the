/**
 * Create a TheJitter instance
 * @function create
 * @param {...*} args
 * @returns {TheJitter}
 */
'use strict'

const TheJitter = require('./TheJitter')

/** @lends create */
function create(...args) {
  return new TheJitter(...args)
}

module.exports = create
