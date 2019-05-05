/**
 * @function getAllPropertyDescriptors
 */
'use strict'

/** @lends getAllPropertyDescriptor */
function getAllPropertyDescriptors(instance) {
  let descriptors = {}
  {
    let __proto__ = Object.getPrototypeOf(instance)
    while (__proto__) {
      const { constructor } = __proto__
      if (constructor === Object) {
        break
      }
      const found = Object.getOwnPropertyDescriptors(__proto__)
      descriptors = Object.assign({}, found, descriptors)
      __proto__ = Object.getPrototypeOf(__proto__)
    }
  }
  return descriptors
}

module.exports = getAllPropertyDescriptors
