'use strict'

/**
 * Create a TheRun instance
 * @memberof module:@the-/run
 * @function create
 * @param {...*} args
 * @returns {module:@the-/run.TheRun}
 */
const TheRun = require('./TheRun')

/** @lends module:@the-/run.create */
function create(...args) {
  return new TheRun(...args)
}

module.exports = create
