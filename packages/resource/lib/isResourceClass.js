/**
 * @memberof module:@the-/resource
 * @function isResourceClass
 * @returns {Boolean}
 */
'use strict'

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
    named = named.__proto__
  }
  return false
}

module.exports = isResourceClass
