'use strict'
/**
 * withReady mixin
 * @memberof module:@the-/mixin-scene
 * @function withReady
 * @param {function()} Class - Class to mix
 * @returns {function()} Mixed class
 */
/**
 * @memberof module:@the-/mixin-scene.withReady
 * @inner
 * @class WithReadyMixed
 */
const asClassMixin = require('./helpers/asClassMixin')
const asMethodWrap = require('./helpers/asMethodWrap')
const injectProperties = require('./helpers/injectProperties')

/** @lends module:@the-/mixin-scene.withReady */
const withReady = asClassMixin((Class) => {
  injectProperties(
    Class,
    /** @lends module:@the-/mixin-scene.withReady~WithReadyMixed */
    {
      /**
       * Do only if ready
       * @param {Function} task
       * @returns {Promise<*>}
       */
      async ifReady(task) {
        if (this.isReady) {
          return task()
        }
      },
      /**
       * Get is ready or not
       * @property {boolean} isReady
       */
      isReady: {
        get() {
          return this.get('ready')
        },
      },
      /**
       * Set ready when done
       * @param {Function} task
       * @returns {Promise<*>}
       */
      async readyWhen(task) {
        try {
          return task()
        } finally {
          this.set({ ready: true })
        }
      },
      /**
       * Do unless ready
       * @param {Function} task
       * @returns {Promise<*>}
       */
      async unlessReady(task) {
        if (!this.isReady) {
          return task()
        }
      },
    },
  )
})

module.exports = Object.assign(
  withReady,
  /** @lends withReady */
  {
    when: asMethodWrap(
      (method) =>
        async function readyWhenWrap(...args) {
          return this.readyWhen(async () => method.apply(this, args))
        },
    ),
  },
)
