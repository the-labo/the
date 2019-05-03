/**
 * defineUniqueFilter
 * @function uniqueFilter
 * @param {Object} [options={}] - Optional settings
 * @param {function|string} [options.by=(v)=>v] - Key extractor
 * @returns {function()}
 * @example
 *  ['a', 'b', 'a'].filter(uniqueFilter())
 */
'use strict'

/** @lends uniqueFilter */
function uniqueFilter(options = {}) {
  if (arguments.length > 1) {
    throw new Error('[uniqueFilter] Invalid args.')
  }
  const { by = (v) => v } = options

  const known = {}
  return function filter(v, i) {
    if (i === 0) {
      for (const key of Object.keys(known)) {
        delete known[key]
      }
    }
    const key = by(v)
    if (known[key]) {
      return false
    }
    known[key] = v
    return true
  }
}

uniqueFilter.by = function uniqueFilterBy(key) {
  return uniqueFilter({ by: (values) => values[key] })
}

module.exports = uniqueFilter
