'use strict'
/**
 * @memberof module:@the-/server.helpers
 * @function toControllerFactory
 * @returns {function()}
 */
const { unlessProduction } = require('@the-/check')
const {
  getAllPropertyDescriptors,
  instanceMethodNamesFor,
} = require('@the-/mixin-controller/lib/helpers')
const { assertMethods } = require('../assert')

const innerMethodNames = ['reloadSession', 'saveSession', 'useController']

/** @lends module:@the-/server.helpers.toControllerFactory */
function toControllerFactory(Class, options = {}) {
  unlessProduction(() => {
    if (!Class) {
      throw new Error(
        `[TheServer] Controller "${options.controllerName}" is missing`,
      )
    }
    assertMethods(Class, ['reloadSession', 'saveSession', 'useController'])
  })
  const { sessionStore } = options

  class ControllerFactoryClass extends Class {
    async useController(name) {
      throw new Error('[@the-/server] useController is no longer available')
    }
  }

  const ControllerFactory = (config) => {
    const {
      client: { cid },
    } = config
    const instance = new ControllerFactoryClass(config)
    const state = {}
    /**
     * Reload session from store
     * @returns {Promise<boolean>}
     */
    const reloadSession = async () => {
      const session = (await sessionStore.get(cid)) || {}
      const onSessionChange = () => {
        state.needsToSaveSession = true
      }
      instance.session = new Proxy(session, {
        set(target, k, v) {
          target[k] = v
          onSessionChange()
          return true
        },
      })

      unlessProduction(() => {
        // this.session = asStrictSession(this.session)
      })
    }

    /**
     * Save session
     * @param {Object} [options={}] - Optional settings
     * @returns {Promise<undefined>}
     */
    const saveSession = async (options = {}) => {
      const { force = false } = options
      const skip = !force && !state.needsToSaveSession
      if (skip) {
        return
      }
      await sessionStore.set(cid, Object.assign({}, instance.session))
      state.needsToSaveSession = false
    }

    instance.reloadSession = reloadSession
    instance.saveSession = saveSession

    return instance
  }

  ControllerFactory.describe = (config) => {
    const prototype = new ControllerFactoryClass(config)
    const descriptors = getAllPropertyDescriptors(prototype)
    const methods = instanceMethodNamesFor(prototype, descriptors).filter(
      (name) => !innerMethodNames.includes(name),
    )
    return { methods }
  }

  ControllerFactory.toSpec = (controllerName, config) => {
    const { methods } = ControllerFactory.describe(config)
    return {
      methods: Object.assign(
        {},
        ...methods.map((name) => ({
          [name]: { desc: `${name}` },
        })),
      ),
      name: controllerName,
    }
  }

  ControllerFactory.toModule = (config) => {
    const { methods } = ControllerFactory.describe(config)
    return Object.assign(
      {},
      ...methods.map((name) => ({
        [name]: async function stub() {},
      })),
    )
  }

  return ControllerFactory
}

toControllerFactory.all = ({ controllerClasses, ...options }) =>
  Object.assign(
    {},
    ...Object.entries(controllerClasses).map(([name, Class]) => ({
      [name]: toControllerFactory(Class, {
        controllerName: name,
        ...options,
      }),
    })),
  )

module.exports = toControllerFactory
