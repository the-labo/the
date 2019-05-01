/**
 * Define class mixin
 * @memberof module:@the-/util-ui
 * @function asHOC
 */
'use strict'

/** @lends module:@the-/util-ui.asHOC */
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
