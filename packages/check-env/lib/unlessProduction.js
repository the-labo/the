'use strict'

const isProduction = require('./isProduction')

/**
 * Do unless production env
 * @memberof module:@the-/check
 * @function unlessProduction
 * @param {function()} handler
 * @returns {*}
 */
function unlessProduction(handler) {
  if (isProduction()) {
    return true
  }

  handler()
}

module.exports = unlessProduction
