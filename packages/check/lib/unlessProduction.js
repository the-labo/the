'use strict'

/**
 * Do unless production env
 * @memberof module:@the-/check
 * @function unlessProduction
 * @param {function()} handler
 */
const isProduction = require('./isProduction')

/** @lends module:@the-/check.unlessProduction */
function unlessProduction(handler) {
  if (isProduction()) {
    return true
  }
  handler()
}

module.exports = unlessProduction
