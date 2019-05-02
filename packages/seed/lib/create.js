/**
 * Create a TheSeed instance
 * @memberof module:@the-/seed
 * @function create
 * @param {...*} args
 * @returns {TheSeed}
 */
'use strict'

const TheSeed = require('./TheSeed')

/** @lends module:@the-/seed.create */
function create(...args) {
  return new TheSeed(...args)
}

module.exports = create
