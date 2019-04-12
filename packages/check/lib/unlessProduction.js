/**
 * Do unless production env
 * @function unlessProduction
 * @param {function} handler
 */
'use strict'

const isProduction = require('./isProduction')

/** @lends unlessProduction */
function unlessProduction(handler) {
  if (isProduction()) {
    return true
  }
  handler()
}

module.exports = unlessProduction
