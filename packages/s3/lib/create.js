/**
 * Create a TheS3 instance
 * @function create
 * @param {...*} args
 * @returns {TheS3}
 */
'use strict'

const TheS3 = require('./TheS3')

/** @lends create */
function create (...args) {
  return new TheS3(...args)
}

module.exports = create
