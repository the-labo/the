'use strict'

/**
 * withEntry mixin
 * @memberof module:@the-/mixin-scene
 * @function withEntry
 * @param {function()} Class - Class to mix
 * @returns {function()} Mixed class
 */
/**
 * @memberof module:@the-/mixin-scene.withEntry
 * @inner
 * @class WithEntryMixed
 */
const { expand, flatten } = require('objnest')
const asClassMixin = require('./helpers/asClassMixin')
const injectProperties = require('./helpers/injectProperties')

/** @lends module:@the-/mixin-scene.withEntry */
const withEntry = asClassMixin((Class) => {
  injectProperties(
    Class,
    /** @lends module:@the-/mixin-scene.withEntry~WithEntryMixed */
    {
      dropEntry() {
        const {
          scope: { entry, entryErrors },
        } = this
        entry.drop()
        entryErrors.drop()
      },
      /**
       * Get entry values
       * @param {Object} [options={}]
       * @returns {Object}
       */
      getEntry(options = {}) {
        const { raw = false } = options
        const entry = this.get('entry')
        if (raw) {
          return entry
        }

        return expand(entry)
      },
      /**
       * @param {string} name
       * @returns {boolean}
       */
      hasEntryErrorFor(name) {
        const entryErrors = this.get('entryErrors')
        return name in entryErrors
      },
      /**
       * Reset entry
       */
      resetEntry() {
        const entry = this.getEntry()
        this.dropEntry()
        this.setEntry(entry)
      },
      /**
       * Set entry values
       * @param {Object} newValues
       */
      setEntry(newValues = {}) {
        const {
          scope: { entry, entryErrors },
        } = this
        const current = this.getEntry()
        let values = flatten({ ...current, ...newValues })
        // TODO Remove legacy
        if (this.formatEntry) {
          console.warn('[withEntry] formatEntry is now deprecated')
          values = this.formatEntry(values)
        }

        if (entry.reset) {
          entry.reset(values)
        } else {
          // TODO Remove legacy
          entry.drop()
          entry.set(values)
        }

        {
          const names = Object.keys(newValues).filter(
            (name) => entryErrors.state[name],
          )
          if (names.length > 0) {
            entryErrors.del(...names)
          }
        }
      },
      /**
       * Set entry errors
       * @param {Object} errors
       */
      setEntryErrors(errors) {
        const {
          scope: { entryErrors },
        } = this
        entryErrors.set(errors)
      },
      /**
       * Process an entry
       * @param {Function} handler
       * @returns {Promise<undefined>}
       */
      async processEntry(handler) {
        const {
          scope: { entryErrors },
        } = this
        entryErrors.drop()
        const values = this.getEntry()
        try {
          return await Promise.resolve(handler.call(this, values))
        } catch (e) {
          if (this.catchEntryError) {
            entryErrors.set(this.catchEntryError(e))
            return
          }

          throw e
        }
      },
    },
  )
})

module.exports = withEntry
