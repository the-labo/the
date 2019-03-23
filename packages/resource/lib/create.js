/**
 * Create a TheResource instance
 * @function create
 * @param {...*} args
 * @returns {TheResource}
 */
'use strict'

const TheResource = require('./TheResource')

/** @lends create */
function create(...args) {
  return new TheResource(...args)
}

module.exports = create
