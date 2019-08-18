'use strict'

/**
 * Resolve value in a scope
 * @memberof module:@the-/loc.helpers
 * @function resolveInScope
 * @param {string} keypath
 * @param {Object} data
 * @private
 * @returns {*} */
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
