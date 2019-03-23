/**
 * Define  : class mixin
 * @function asHOC
 */
'use strict'

/** @lends asHOC */
function asHOC(decorator) {
  return function classMixin(ClassDescriptor) {
    const isLegacyDecorator = typeof ClassDescriptor === 'function'
    if (isLegacyDecorator) {
      const Class = ClassDescriptor
      return decorator(Class)
    }
    throw new Error(`[asHOC] Not implemented yet`)
  }
}

module.exports = asHOC
