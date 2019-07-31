'use strict'

/**
 * @memberof module:@the-/handle
 * @namespace helpers
 */
/** @lends module:@the-/handle.helpers */
module.exports = {
  allMethodNames(instance) {
    const names = []
    const namesToIgnore = ['constructor']
    let __proto__ = Object.getPrototypeOf(instance)
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
      __proto__ = Object.getPrototypeOf(__proto__)
    }
    return names
  },
  setByNamepath(target, namepath, value, separtor = '.') {
    const names = namepath.split(separtor)
    const resolvedNames = []
    while (names.length > 1) {
      const name = names.shift()
      resolvedNames.push(name)
      if (!(name in target)) {
        target[name] = {}
      }
      target = target[name]
    }
    target[names.shift()] = value
  },
}
