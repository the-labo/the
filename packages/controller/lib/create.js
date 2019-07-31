'use strict'

/**
 * Create a TheControllerBase instance
 * @memberof module:@the-/controller
 * @function create
 * @param {...*} args
 * @returns {TheControllerBase}
 */
const TheCtrl = require('./TheCtrl')

/** @lends module:@the-/controller.create */
function create(...args) {
  return new TheCtrl(...args)
}

module.exports = create
