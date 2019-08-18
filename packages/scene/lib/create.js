'use strict'

const TheScene = require('./TheScene')

/**
 * Create a TheScene instance
 * @memberof module:@the-/scene
 * @function create
 * @param {...*} args
 * @returns {TheScene}
 */
function create(...args) {
  return new TheScene(...args)
}

module.exports = create
