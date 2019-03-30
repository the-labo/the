/**
 * Define as class mixin
 * @function asClassMixin
 */
'use strict'

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
      finisher: (Class) => {
        enhancer(Class)
      },
      kind,
    }
  }
}

module.exports = asClassMixin
