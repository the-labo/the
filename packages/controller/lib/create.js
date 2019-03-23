/**
 * Create a TheControllerBase instance
 * @function create
 * @param {...*} args
 * @returns {TheControllerBase}
 */
'use strict'

const TheCtrl = require('./TheCtrl')

/** @lends create */
function create(...args) {
  return new TheCtrl(...args)
}

module.exports = create
