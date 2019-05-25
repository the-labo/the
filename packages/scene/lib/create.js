'use strict'
/**
 * Create a TheScene instance
 * @memberof module:@the-/scene
 * @function create
 * @param {...*} args
 * @returns {TheScene}
 */
const TheScene = require('./TheScene')

/** @lends module:@the-/scene.create */
function create(...args) {
  return new TheScene(...args)
}

module.exports = create
