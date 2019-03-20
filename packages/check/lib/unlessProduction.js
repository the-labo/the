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
  const assert = require('assert')
  handler(assert)
}

module.exports = unlessProduction
