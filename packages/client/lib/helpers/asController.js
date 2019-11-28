'use strict'

/**
 * @memberof module:@the-/client.helpers
 * @function asController
 * @param {Object} instance
 * @param {Object} spec
 * @param {Object} context
 * @param {Object} [options={}]
 * @returns Object
 */
function asController(instance, spec, context, options = {}) {
  const { onToggleHandler = () => null } = options
  return Object.assign(
    {
      callbacks: {},
      controllerName: spec.name,
    },
    ...Object.keys(spec.methods).map((name) => ({
      [name]: async function methodProxy(...args) {
        return instance[name](context, ...args)
      },
    })),
    {
      /**
       * Add callback function
       * @param {string} handleName
       * @param {function()} callbackFunc
       * @returns {function()} Cleanup functions
       */
      addCallback(handleName, callbackFunc) {
        const callbacks = this.callbacks[handleName] || []
        const added = [...callbacks, callbackFunc]
        if (callbacks.length === 0) {
          onToggleHandler(handleName, true)
        }

        this.callbacks = { ...this.callbacks, [handleName]: added }
        return () => this.removeCallback(handleName, callbackFunc)
      },
      /**
       * Add multiple callback functions at once
       * @param {Object<string, function>} callbackFuncs
       * @returns {function()} cleanup function
       */
      addCallbacks(callbackFuncs) {
        const closeFuncs = Object.entries(
          callbackFuncs,
        ).map(([handleName, callback]) =>
          this.addCallback(handleName, callback),
        )
        return () => {
          for (const closeFunc of closeFuncs) {
            closeFunc()
          }
        }
      },
      /** @deprecated */
      delCallback(...handleNames) {
        for (const handleName of handleNames) {
          this.removeAllCallbacksFor(handleName)
        }
      },
      removeAllCallbacksFor(handleName) {
        const callbacks = this.callbacks[handleName] || []
        for (const callback of callbacks) {
          this.removeCallback(handleName, callback)
        }
      },
      /**
       * Remove callbacks
       * @param {string} handleName
       * @param {function()} callbackFunc
       */
      removeCallback(handleName, callbackFunc) {
        const callbacks = this.callbacks[handleName] || []
        const removed = callbacks.filter((c) => c !== callbackFunc)
        if (removed.length === 0) {
          onToggleHandler(handleName, false)
        }

        this.callbacks = {
          ...this.callbacks,
          [handleName]: removed,
        }
      },
      removeCallbacks(callbackFuncs) {
        for (const [handleName, callback] of Object.entries(callbackFuncs)) {
          this.removeCallback(handleName, callback)
        }
      },
      /** @deprecated */
      setCallback(handleName, callback) {
        if (arguments.length >= 2) {
          this.addCallback(handleName, callback)
        } else {
          this.addCallbacks(arguments[0])
        }
      },
    },
  )
}

module.exports = asController
