/**
 * Do unless production env
 * @memberOf module:@the-/check
 * @function unlessProduction
 * @param {function} handler
 */
'use strict'

const isProduction = require('./isProduction')

/** @lends module:@the-/check.unlessProduction */
function unlessProduction(handler) {
  if (isProduction()) {
    return true
  }
  handler()
}

module.exports = unlessProduction
