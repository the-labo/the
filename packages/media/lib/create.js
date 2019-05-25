'use strict'
/**
 * Create a TheMedia instance
 * @memberof module:@the-/media
 * @function create
 * @param {...*} args
 * @returns {TheMedia}
 */
const TheMedia = require('./TheMedia')

/** @lends create */
function create(...args) {
  return new TheMedia(...args)
}

module.exports = create
