'use strict'

/**
 * @memberof module:@the-/loc.helpers
 * @function mergedLocales
 * @param {Object} l1
 * @param {Object} l2
 * @private
 */
const { expand, flatten } = require('objnest')

/** @lends mergedLocales */
function mergedLocales(l1, l2) {
  return expand(Object.assign({}, flatten(l1 || {}), flatten(l2 || {})))
}

module.exports = mergedLocales
