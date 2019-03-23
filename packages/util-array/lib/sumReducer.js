/**
 * sumReducer
 * @param {function}
 * @param {Object} [options={}] - Optional settings
 * @param {function|string} [options.of=(v)=>v] - Key extractor
 * @returns {function}
 * @example
 *  [2,2,4].filter(sumReducer())
 */
'use strict'

/** @lends sumReducer */
function sumReducer(options = {}) {
  if (arguments.length > 1) {
    throw new Error('[sumReducer] Invalid args.')
  }

  const { of = (v) => v } = options

  return function reducer(reduced, val) {
    return reduced + Number(of(val))
  }
}

sumReducer.of = function sumReducerOf(key) {
  return sumReducer({ of: (values) => values[key] })
}

module.exports = sumReducer
