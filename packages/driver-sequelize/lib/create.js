/**
 * Create a TheDriverSequelize instance
 * @function create
 * @param {...*} args
 * @returns {TheDriverSequelize}
 */
'use strict'

const TheDriverSequelize = require('./TheDriverSequelize')

/** @lends create */
function create(...args) {
  return new TheDriverSequelize(...args)
}

module.exports = create
