/**
 * Define method wrapper
 * @memberof module:@the-/mixin-scene.helpers
 * @function asMethodWrap
 */
'use strict'

const invariant = require('invariant')

/** @lends module:@the-/mixin-scene.helpers.asMethodWrap */
function asMethodWrap(wrapper) {
  return function methodWrap(elementDescriptor) {
    // TODO Remove some day
    {
      const isLegacyDecorator = ['kind', 'key', 'descriptor'].some(
        (k) => !(k in elementDescriptor),
      )
      if (isLegacyDecorator) {
        const [, , descriptor] = [...arguments]
        const { value: original } = descriptor
        return { ...descriptor, value: wrapper(original) }
      }
    }

    const { descriptor, key, kind, placement } = elementDescriptor
    invariant(kind === 'method', '[TheSceneMixins] Must be a method')
    const { value: original } = descriptor
    return {
      descriptor: {
        ...descriptor,
        value: wrapper(original),
      },
      key,
      kind,
      placement,
    }
  }
}

module.exports = asMethodWrap
