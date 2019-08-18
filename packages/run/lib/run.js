'use strict'

const create = require('./create')

/**
 * Create and run
 * @memberof module:@the-/run
 * @function run
 * @param {Object} [options={}]
 * @param {string} filename
 * @returns {*}
 */
function run(filename, options = {}) {
  return create(options).run(filename)
}

module.exports = run
