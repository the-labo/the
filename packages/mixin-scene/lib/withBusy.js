'use strict'

/**
 * withBusy mixin
 * @memberof module:@the-/mixin-scene
 * @function withBusy
 * @param {function()} Class - Class to mix
 * @returns {function()} Mixed class
 */
/**
 * @memberof module:@the-/mixin-scene.withBusy
 * @class WithBusyMixed
 * @inner
 */
const asleep = require('asleep')
const asClassMixin = require('./helpers/asClassMixin')
const asMethodWrap = require('./helpers/asMethodWrap')
const injectProperties = require('./helpers/injectProperties')

/** @lends module:@the-/mixin-scene.withBusy */
const withBusy = asClassMixin((Class) => {
  injectProperties(
    Class,
    /** @lends module:@the-/mixin-scene.withBusy.WithBusyMixed */
    {
      /**
       * Is busy or not
       * @returns {boolean}
       */
      isBusy() {
        return this.get('busy')
      },
      /**
       * Wait busy for
       * @param {number} duration
       * @returns {Promise<undefined>}
       */
      async busyFor(duration = 0) {
        this.set({ busy: true })
        await asleep(duration)
        this.set({ busy: false })
      },
      /**
       * Set busy true while task active
       * @param {Function} task
       * @returns {Promise<undefined>}
       */
      async busyWhile(task) {
        this.set({ busy: true })
        try {
          return await task.call(this)
        } finally {
          this.set({ busy: false })
        }
      },
      /**
       * Wait while busy
       * @returns {Promise<undefined>}
       */
      async waitWhileBusy() {
        await asleep(1)
        while (this.isBusy()) {
          await asleep(1)
        }
      },
    },
  )
})

module.exports = Object.assign(
  withBusy,
  /** @lends withBusy */
  {
    sequential: asMethodWrap(
      (method) =>
        async function busyWhileWrap(...args) {
          await this.waitWhileBusy()
          return method.apply(this, args)
        },
    ),
    while: asMethodWrap(
      (method) =>
        async function busyWhileWrap(...args) {
          return this.busyWhile(async () => method.apply(this, args))
        },
    ),
  },
)
