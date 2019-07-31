'use strict'

/**
 * Create a TheLoc instance
 * @memberof module:@the-/loc
 * @function create
 * @param {...*} args
 * @returns {TheLoc}
 */
const TheLoc = require('./TheLoc')

/** @lends module:@the-/loc.create */
function create(...args) {
  return new TheLoc(...args)
}

module.exports = create
