'use strict'
/**
 * @memberof module:@the-/server.helpers
 * @function toControllerDriverFactory
 * @returns {function()}
 */
const isClass = require('is-class')
const theAssert = require('@the-/assert')
const { unlessProduction } = require('@the-/check')
const assert = theAssert('@the-/server')

/** @lends module:@the-/server.helpers.toControllerDriverFactory */
function toControllerDriverFactory(ControllerFactory, options = {}) {
  const { controllerName } = options
  unlessProduction(() => {
    assert(
      !!ControllerFactory,
      `[TheServer] Controller "${controllerName}" is missing`,
    )

    assert(
      !isClass(ControllerFactory),
      `class base ctrl is no longer available: "${controllerName}"`,
    )
  })

  const { sessionStore } = options

  function ControllerDriverFactory(
    controllerName,
    { callbacks = {}, client = {} } = {},
  ) {
    const { cid } = client
    const state = {
      needsToSaveSession: false,
      session: {},
    }

    /**
     * Reload session from store
     * @returns {Promise<boolean>}
     */
    const reloadSession = async () => {
      const loaded = (await sessionStore.get(cid)) || {}
      for (const key of Object.keys(state.session)) {
        const deleted = !(key in loaded)
        if (deleted) {
          delete state.session[key]
        }
      }
      Object.assign(state.session, loaded)
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
      await sessionStore.set(cid, Object.assign({}, state.session))
      state.needsToSaveSession = false
    }
    const noop = () => null
    const interceptors = {
      controllerDidAttach: noop,
      controllerMethodDidInvoke: noop,
      controllerMethodWillInvoke: noop,
      controllerWillDetach: noop,
    }
    const controller = ControllerFactory({
      callbacks,
      session: new Proxy(state.session, {
        set(target, k, v) {
          target[k] = v
          state.needsToSaveSession = true
          return true
        },
      }),
      intercept: (funcs = {}) => {
        for (const [name, func] of Object.entries(funcs)) {
          assert(name in interceptors, `Unknown interceptor name: ${name}`)
          interceptors[name] = func
        }
      },
    })
    const driver = {
      controller,
      controllerName,
      interceptors,
      reloadSession,
      saveSession,
      async invoke(methodName, args) {
        return controller[methodName](...args)
      },
    }

    Object.freeze(driver)

    return driver
  }

  return ControllerDriverFactory
}

toControllerDriverFactory.all = (Controllers, options = {}) =>
  Object.assign(
    {},
    ...Object.entries(Controllers).map(([controllerName, Controller]) => ({
      [controllerName]: toControllerDriverFactory(Controller, {
        controllerName,
        ...options,
      }),
    })),
  )

module.exports = toControllerDriverFactory
