/**
 * Create a TheSecret instance
 * @memberOf module:@the-/secret
 * @function create
 * @param {...*} args
 * @returns {module:@the-/secret.TheSecret}
 */
'use strict'

const TheSecret = require('./TheSecret')

/** @lends create */
function create(...args) {
  return new TheSecret(...args)
}

module.exports = create
