/**
 * @function injectProperties
 * @param {function()} Class
 * @returns {function()} Injected Class
 */
'use strict'

/** @lends injectProperties */
function injectProperties(Class, properties) {
  for (const [name, property] of Object.entries(properties)) {
    switch (typeof property) {
      case 'function':
        Class.prototype[name] = property
        break
      case 'object':
        Object.defineProperty(Class.prototype, name, property)
        break
      default:
        throw new Error(`[the-scene-mixins] Invalid property`)
    }
  }
}

module.exports = injectProperties
