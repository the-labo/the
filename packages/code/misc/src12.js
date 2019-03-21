/**
 * Define method wrapper
 * @function asMethodWrap
 */
'use strict'

const invariant = require('invariant')

/** @lends asMethodWrap */
function asMethodWrap(wrapper) {
  return function methodWrap(elementDescriptor) {
    // TODO Remove some day
    {
      const isLegacyDecorator = ['kind', 'key', 'descriptor'].some(
        (k) => !(k in elementDescriptor),
      )
      if (isLegacyDecorator) {
        const [, key, descriptor] = [...arguments]
        const { value: original } = descriptor
        descriptor.value = wrapper(original)
        return descriptor
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
