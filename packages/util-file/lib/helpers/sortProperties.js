/**
 * Sort object properties
 * @memberof module:@the-/util-file.helpers
 * @protected
 * @function sortProperties
 */
'use strict'

/** @lends sortProperties */
function sortProperties(data) {
  if (!data) {
    return data
  }
  if (Array.isArray(data)) {
    return data.map(sortProperties)
  }
  switch (typeof data) {
    case 'string':
    case 'number':
    case 'boolean':
      return data
    default:
      break
  }
  const isObject = data.constructor === Object
  if (!isObject) {
    return data
  }
  const sorted = {}
  const keys = Object.keys(data).sort((a, b) => a.localeCompare(b))
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i]
    const val = data[key]
    if (Array.isArray(val)) {
      sorted[key] = val
    } else if (typeof val === 'object') {
      sorted[key] = sortProperties(val)
    } else {
      sorted[key] = val
    }
  }
  return sorted
}

module.exports = sortProperties
