'use strict'

const TheMedia = require('./TheMedia')

/**
 * Create a TheMedia instance
 * @memberof module:@the-/media
 * @function create
 * @param {...*} args
 * @returns {TheMedia}
 */
function create(...args) {
  return new TheMedia(...args)
}

module.exports = create
