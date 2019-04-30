/**
 * Create a TheControllerBase instance
 * @memberOf module:@the-/controller
 * @function create
 * @param {...*} args
 * @returns {TheControllerBase}
 */
'use strict'

const TheCtrl = require('./TheCtrl')

/** @lends module:@the-/controller.create */
function create(...args) {
  return new TheCtrl(...args)
}

module.exports = create
