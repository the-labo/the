/**
 * Create a TheSecret instance
 * @function create
 * @param {...*} args
 * @returns {TheSecret}
 */
'use strict'

const TheSecret = require('./TheSecret')

/** @lends create */
function create(...args) {
  return new TheSecret(...args)
}

module.exports = create
