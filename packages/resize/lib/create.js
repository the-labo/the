/**
 * Create a TheResize instance
 * @function create
 * @param {...*} args
 * @returns {TheResize}
 */
'use strict'

const TheResize = require('./TheResize')

/** @lends create */
function create(...args) {
  return new TheResize(...args)
}

module.exports = create
