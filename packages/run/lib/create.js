'use strict'

const TheRun = require('./TheRun')

/**
 * Create a TheRun instance
 * @memberof module:@the-/run
 * @function create
 * @param {...*} args
 * @returns {module:@the-/run.TheRun}
 */
function create(...args) {
  return new TheRun(...args)
}

module.exports = create
