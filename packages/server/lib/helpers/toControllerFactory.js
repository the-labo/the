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
  const { sessionCache, sessionStore } = options

  class ControllerFactoryClass extends Class {
    constructor(...args) {
      super(...args)
      this._needsToSaveSession = false
    }

    /**
     * Reload session from store
     * @param {Object} [options={}] - Optional settings
     * @returns {Promise<boolean>}
     */
    async reloadSession(options = {}) {
      const {
        client: { cid },
      } = this
      const cached = sessionCache.get(cid)
      const session = cached || (await sessionStore.get(cid)) || {}
      if (!cached) {
        sessionCache.set(cid, session)
      }
      const onSessionChange = () => {
        sessionCache.del(cid)
        this._needsToSaveSession = true
      }
      this.session = new Proxy(session, {
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
    async saveSession(options = {}) {
      const { force = false } = options
      const skip = !force && !this._needsToSaveSession
      if (skip) {
        return
      }
      const {
        client: { cid },
        session,
      } = this
      await sessionStore.set(cid, Object.assign({}, session))
      sessionCache.del(cid)
      this._needsToSaveSession = false
    }

    async useController(name) {
      throw new Error('[@the-/server] useController is no longer available')
    }
  }

  const ControllerFactory = (config) => new ControllerFactoryClass(config)

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
