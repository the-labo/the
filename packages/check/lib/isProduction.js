/**
 * Do unless production env
 * @memberof module:@the-/check
 * @function isProduction
 * @returns {boolean} Is production or not
 */
'use strict'

/** @lends module:@the-/check.isProduction */
function isProduction() {
  return process.env.NODE_ENV === 'production'
}

module.exports = isProduction
