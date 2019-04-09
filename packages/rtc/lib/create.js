/**
 * Create a TheRTC instance
 * @function create
 * @param {...*} args
 * @returns {TheRTC}
 */
'use strict'

const TheRTC = require('./TheRTC')

/** @lends create */
function create(...args) {
  return new TheRTC(...args)
}

module.exports = create
