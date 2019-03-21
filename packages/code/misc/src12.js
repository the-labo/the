/**
 * Define method wrapper
 * @function asMethodWrap
 */
'use strict'

const invariant = require('invariant')

/** @lends asMethodWrap */
function asMethodWrap (wrapper) {
  return function methodWrap (elementDescriptor) {

    // TODO Remove some day
    {
      const isLegacyDecorator = ['kind', 'key', 'descriptor'].some((k) => !(k in elementDescriptor))
      if (isLegacyDecorator) {
        const [target, key, descriptor] = [...arguments]
        const { value: original } = descriptor
        descriptor.value = wrapper(original)
        return descriptor
      }
    }

    const { kind, key, descriptor, placement } = elementDescriptor
    invariant(kind === 'method', '[TheSceneMixins] Must be a method')
    const { value: original } = descriptor
    return {
      kind,
      key,
      descriptor: {
        ...descriptor,
        value: wrapper(original),
      },
      placement
    }
  }
}

module.exports = asMethodWrap
