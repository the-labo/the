/**
 * Create a TheRun instance
 * @function create
 * @param {...*} args
 * @returns {TheRun}
 */
'use strict'

const TheRun = require('./TheRun')

/** @lends create */
function create(...args) {
  return new TheRun(...args)
}

module.exports = create
