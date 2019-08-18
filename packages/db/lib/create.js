'use strict'

const TheDB = require('./TheDB')

/**
 * Create a TheDB instance
 * @memberof module:@the-/db
 * @function create
 * @param {...*} args
 * @returns {module:@the-/db.TheDB}
 */
function create(...args) {
  return new TheDB(...args)
}

module.exports = create
