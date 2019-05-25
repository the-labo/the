'use strict'
/**
 * Wrap controller instance with debug utility
 * @memberof module:@the-/client.helpers
 * @function debugController
 */
const methodsToSkip = [
  'debugWrap',
  'toString',
  'valueOf',
  'then',
  'catch',
  'finally',
  'toJSON',
  'default',
]

/** @lends module:@the-/client.helpers.debugController */
function debugController(controller) {
  const TOO_LONG_THRESHOLD = 3 * 1000
  return new Proxy(controller, {
    get(instance, name) {
      const value = instance[name]
      if (name === 'session') {
        console.warn('[TheClient] You cannot access session on client side')
      }
      const shouldWrap =
        typeof value === 'function' && !methodsToSkip.includes(value.name)
      if (shouldWrap) {
        return async function debugWrap(...args) {
          const { controllerName } = controller
          const startAt = new Date()
          let result, caught
          let timeoutTimer = setTimeout(() => {
            const done =
              typeof caught !== 'undefined' || typeof result !== 'undefined'
            if (!done) {
              console.warn(
                `[TheClient][TOOK_TOO_LONG] \`${controllerName}.${name}()\` has not returned in ${TOO_LONG_THRESHOLD}ms`,
              )
            }
          }, TOO_LONG_THRESHOLD)
          try {
            result = await value.apply(controller, args)
          } catch (e) {
            caught = e
          } finally {
            clearTimeout(timeoutTimer)
            timeoutTimer = null
          }
          const took = new Date() - startAt
          console.groupCollapsed(
            `[TheClient] Call \`${controllerName}.${name}()\``,
          )
          console.log('Signature', `\`${controllerName}.${name}()\``)
          console.log('Arguments', args)
          if (caught) {
            console.log('Exception', caught)
          } else {
            console.log('Result', result)
          }
          console.log('Took', `${took}ms`)
          console.groupEnd()
          if (caught) {
            throw caught
          }
          return result
        }
      }
      return value
    },
  })
}

module.exports = debugController
