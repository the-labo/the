/**
 * Create and run
 * @memberof module:@the-/run
 * @function run
 * @param {string} filename
 * @param {Object} [options={}]
 */
'use strict'

const create = require('./create')

/** @lends module:@the-/run.run */
function run(filename, options = {}) {
  return create(options).run(filename)
}

module.exports = run
