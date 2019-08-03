'use strict'

/**
 * @memberof module:@the-/resource
 * @function isResourceClass
 * @returns {boolean}
 */
const TheResource = require('./TheResource')

/** @lends module:@the-/resource.isResourceClass */
function isResourceClass(Class) {
  const hitByClass =
    Class.prototype instanceof TheResource || Class === TheResource
  if (hitByClass) {
    return true
  }

  let named = Class
  while (named) {
    const hit = named.name && named.name.startsWith('TheResource')
    if (hit) {
      return true
    }

    named = Object.getPrototypeOf(named)
  }
  return false
}

module.exports = isResourceClass
