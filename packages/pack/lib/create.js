/**
 * Create a ThePack instance
 * @function create
 * @param {...*} args
 * @returns {ThePack}
 */
'use strict'

const ThePack = require('./ThePack')

/** @lends create */
function create (...args) {
  return new ThePack(...args)
}

module.exports = create
