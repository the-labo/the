'use strict'

/**
 * Resolve value in a scope
 * @function resolveInScope
 * @param {Object} data
 * @param {string} keypath
 * @private
 * @memberOf module:@the-/loc.helpers
 */
/** @lends resolveInScope */
function resolveInScope(scope, keypath) {
  let data = scope
  for (const key of keypath.split(/\./g)) {
    data = data[key]
    if (!data) {
      return null
    }
  }
  return data
}

module.exports = resolveInScope
