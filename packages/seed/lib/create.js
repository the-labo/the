/**
 * Create a TheSeed instance
 * @function create
 * @param {...*} args
 * @returns {TheSeed}
 */
'use strict'

const TheSeed = require('./TheSeed')

/** @lends create */
function create(...args) {
  return new TheSeed(...args)
}

module.exports = create
