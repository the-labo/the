'use strict'

const methodsToWrap = ['open', 'close']

/**
 * Wrap stream with debug utility
 * @memberof module:@the-/client.helpers
 * @function debugStream
 */
function debugStream(stream) {
  return new Proxy(stream, {
    get(instance, name) {
      const value = instance[name]

      const shouldWrap =
        typeof value === 'function' && methodsToWrap.includes(value.name)
      if (shouldWrap) {
        return async function debugWrap(...args) {
          const { streamName } = stream
          const startAt = new Date()
          console.groupCollapsed(
            `[TheClient][Stream] \`${streamName}.${name}()\``,
          )
          const result = await value.apply(stream, args)
          const took = new Date() - startAt
          console.log('Arguments', args)
          console.log('Took', `${took}ms`)
          console.groupEnd()
          return result
        }
      }

      return value
    },
  })
}

module.exports = debugStream
