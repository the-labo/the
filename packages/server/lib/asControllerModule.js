'use strict'
/**
 * Mark as RPCController
 * @memberof module:@the-/server
 * @function asControllerModule
 */
const { unlessProduction } = require('@the-/check')
const { assertMethods } = require('./assert')

const innerMethodNames = ['reloadSession', 'saveSession', 'useController']

/** @lends module:@the-/server.asControllerModule */
function asControllerModule(Class, options = {}) {
  const { controllerName, describeController, instantiateController } = options

  unlessProduction(() => assertMethods(Class, innerMethodNames))

  const { methods: instanceMethodNames } = describeController(controllerName)
  return Object.assign(
    {},
    ...instanceMethodNames
      .filter((name) => !innerMethodNames.includes(name))
      .map((name) => ({
        [name]: async function controllerMethodProxy({ cid }, ...params) {
          if (!cid) {
            throw new Error('[TheServer] cid is required')
          }
          const instance = await instantiateController(controllerName, cid)
          await instance.reloadSession()
          if (instance.controllerMethodWillInvoke) {
            await instance.controllerMethodWillInvoke({ name, params })
          }
          const result = await instance[name](...params)
          if (instance.controllerMethodDidInvoke) {
            await instance.controllerMethodDidInvoke({ name, params, result })
          }
          await instance.saveSession()
          return result
        },
      })),
  )
}

module.exports = asControllerModule
