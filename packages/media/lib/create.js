/**
 * Create a TheMedia instance
 * @function create
 * @param {...*} args
 * @returns {TheMedia}
 */
'use strict'

const TheMedia = require('./TheMedia')

/** @lends create */
function create(...args) {
  return new TheMedia(...args)
}

module.exports = create
