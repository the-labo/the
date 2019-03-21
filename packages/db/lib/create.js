/**
 * Create a TheDB instance
 * @function create
 * @param {...*} args
 * @returns {TheDB}
 */
'use strict'

const TheDB = require('./TheDB')

/** @lends create */
function create(...args) {
  return new TheDB(...args)
}

module.exports = create
