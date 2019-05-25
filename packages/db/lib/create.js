'use strict'
/**
 * Create a TheDB instance
 * @memberof module:@the-/db
 * @function create
 * @param {...*} args
 * @returns {module:@the-/db.TheDB}
 */
const TheDB = require('./TheDB')

/** @lends module:@the-/db.create */
function create(...args) {
  return new TheDB(...args)
}

module.exports = create
