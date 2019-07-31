'use strict'

/**
 * Create a TheFacebook instance
 * @function create
 * @param {...*} args
 * @returns {TheFacebook}
 */
const TheFacebook = require('./TheFacebook')

/** @lends create */
function create(...args) {
  return new TheFacebook(...args)
}

module.exports = create
