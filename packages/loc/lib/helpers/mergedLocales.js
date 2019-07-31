'use strict'

/**
 * @function mergedLocales
 * @param {Object} l1
 * @param {Object} l2
 * @private
 * @memberOf module:@the-/loc.helpers
 */
const { expand, flatten } = require('objnest')

/** @lends mergedLocales */
function mergedLocales(l1, l2) {
  return expand(Object.assign({}, flatten(l1 || {}), flatten(l2 || {})))
}

module.exports = mergedLocales
