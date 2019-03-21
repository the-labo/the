/**
 * Create a TheSupport instance
 * @function create
 * @param {...*} args
 * @returns {TheSupport}
 */
'use strict'

const TheSupport = require('./TheSupport')

/** @lends create */
function create (...args) {
  return new TheSupport(...args)
}

module.exports = create
