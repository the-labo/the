/**
 * @memberof module:@the-/handle
 * @namespace helpers
 */
'use strict'

/** @lends module:@the-/handle.helpers */
module.exports = {
  allMethodNames(instance) {
    const names = []
    const namesToIgnore = ['constructor']
    let { __proto__ } = instance
    while (__proto__) {
      const { constructor } = __proto__
      if (constructor === Object) {
        break
      }
      const found = Object.getOwnPropertyNames(__proto__)
        .filter((name) => !namesToIgnore.includes(name))
        .filter((name) => {
          const descriptor = Object.getOwnPropertyDescriptor(__proto__, name)
          return descriptor.hasOwnProperty('value') // Ignore dynamic getter/setter
        })
        .filter((name) => typeof instance[name] === 'function')
      names.unshift(...found)
      __proto__ = __proto__.__proto__
    }
    return names
  },
  setByNamepath(target, namepath, value, separtor = '.') {
    let names = namepath.split(separtor)
    let resolvedNames = []
    while (names.length > 1) {
      let name = names.shift()
      resolvedNames.push(name)
      if (!(name in target)) {
        target[name] = {}
      }
      target = target[name]
    }
    target[names.shift()] = value
  },
}
