'use strict'

/**
 * Define as class mixin
 * @memberof module:@the-/mixin-scene.helpers
 * @function asClassMixin
 */
const invariant = require('invariant')

/** @lends asClassMixin */
function asClassMixin(enhancer) {
  return function classMixin(ClassDescriptor) {
    // TODO Remove some day
    {
      const isLegacyDecorator = typeof ClassDescriptor === 'function'
      if (isLegacyDecorator) {
        const Class = ClassDescriptor
        enhancer(Class)
        return Class
      }
    }

    const { elements, kind } = ClassDescriptor
    invariant(
      kind === 'class',
      `[TheSceneMixins] Must be a class (given: "${kind}")`,
    )
    return {
      elements: [...elements],
      kind,
      finisher: (Class) => {
        enhancer(Class)
      },
    }
  }
}

module.exports = asClassMixin
