'use strict'

/**
 * defineUniqueFilter
 * @memberof module:@the-/util-array
 * @function uniqueFilter
 * @param {Object} [options={}] - Optional settings
 * @param {function()|string} [options.by=(v)=>v] - Key extractor
 * @returns {function()}
 * @example
 *  ['a', 'b', 'a'].filter(uniqueFilter())
 */
function uniqueFilter(options = {}) {
  if (arguments.length > 1) {
    throw new Error('[uniqueFilter] Invalid args.')
  }

  const { by = (v) => v } = options

  const known = new Set()
  return function filter(v, i, arr) {
    if (i === 0) {
      known.clear()
    }

    const key = by(v)
    const isDuplicated = known.has(key)
    known.add(key)
    const isLast = i === arr.length - 1
    if (isLast) {
      known.clear()
    }

    return !isDuplicated
  }
}

uniqueFilter.by = function uniqueFilterBy(key) {
  return uniqueFilter({ by: (values) => values[key] })
}

module.exports = uniqueFilter
