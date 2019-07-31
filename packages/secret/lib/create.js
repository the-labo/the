'use strict'

/**
 * Create a TheSecret instance
 * @memberof module:@the-/secret
 * @function create
 * @param {...*} args
 * @returns {module:@the-/secret.TheSecret}
 */
const TheSecret = require('./TheSecret')

/** @lends create */
function create(...args) {
  return new TheSecret(...args)
}

module.exports = create
