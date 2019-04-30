/**
 * Create a TheScene instance
 * @memberOf module:@the-/scene
 * @function create
 * @param {...*} args
 * @returns {TheScene}
 */
'use strict'

const TheScene = require('./TheScene')

/** @lends module:@the-/scene.create */
function create(...args) {
  return new TheScene(...args)
}

module.exports = create
