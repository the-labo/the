'use strict'

/**
 * @memberof module:@the-/util-ctrl
 * @function omitLongString
 * @param value
 * @param [options={}]
 * @returns {*}
 */
function omitLongString(value, options = {}) {
  const { __recursiveDeps = 0, maxLength = 100 } = options
  if (__recursiveDeps > 4) {
    return value
  }

  if (!value) {
    return value
  }

  if (typeof value === 'string') {
    return value.length > maxLength ? `${value.slice(0, maxLength)}...` : value
  }

  if (Array.isArray(value)) {
    const array = value.map((v) =>
      omitLongString(v, {
        ...options,
        __recursiveDeps: __recursiveDeps + 1,
      }),
    )
    return array
  }

  if (typeof value === 'object') {
    const newObj = {}
    for (const [k, v] of Object.entries(value)) {
      newObj[k] = omitLongString(v, {
        ...options,
        __recursiveDeps: __recursiveDeps + 1,
      })
    }
    return newObj
  }

  return value
}

module.exports = omitLongString
