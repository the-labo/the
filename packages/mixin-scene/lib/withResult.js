'use strict'
/**
 * withResult mixin
 * @memberof module:@the-/mixin-scene
 * @function withResult
 * @param {function()} Class - Class to mix
 * @returns {function()} Mixed class
 */
/**
 * @memberof module:@the-/mixin-scene.withResult
 * @inner
 * @class WithResultMixed
 */
const asClassMixin = require('./helpers/asClassMixin')
const asMethodWrap = require('./helpers/asMethodWrap')
const injectProperties = require('./helpers/injectProperties')

/** @lends module:@the-/mixin-scene.withResult */
const withResult = asClassMixin((Class) => {
  injectProperties(
    Class,
    /** @lends module:@the-/mixin-scene.withResult~WithResultMixed */
    {
      /**
       * Do action and store result
       * @param {Function} action
       * @returns {Promise<*>} - Action result
       */
      async resultFor(action) {
        try {
          const result = await action.apply(this)
          const isUndefined = typeof result === 'undefined'
          if (isUndefined) {
            console.warn(`[${this.sceneName}] received undefined result`)
          } else {
            this.set({ result })
          }
          return result
        } catch (e) {
          this.scope.result.del()
          throw e
        }
      },
    },
  )
})

module.exports = Object.assign(
  withResult,
  /** @lends module:@the-/mixin-scene.withResult */
  {
    save: asMethodWrap(
      (method) =>
        async function resultSave(...args) {
          return this.resultFor(async () => method.apply(this, args))
        },
    ),
  },
)
