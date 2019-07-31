'use strict'

/**
 * withFilter mixin
 * @memberof module:@the-/mixin-scene
 * @function withFilter
 * @param {function()} Class - Class to mix
 * @returns {function()} Mixed class
 */
/**
 * @memberof module:@the-/mixin-scene.withFilter
 * @inner
 * @class WithFilterMixed
 */
const { cleanup } = require('asobj')
const asClassMixin = require('./helpers/asClassMixin')
const injectProperties = require('./helpers/injectProperties')

/** @lends module:@the-/mixin-scene.withFilter */
const withFilter = asClassMixin((Class) => {
  injectProperties(
    Class,
    /** @lends module:@the-/mixin-scene.withFilter~WithFilterMixed */
    {
      /**
       * Get filter
       * @returns {Object}
       */
      getFilter() {
        return this.get('filter')
      },
      /**
       * Set filter
       * @param {Object} filter
       */
      setFilter(filter) {
        this.set({ filter })
      },
      /** Set filters by q */
      setFilterByQ(q, options = {}) {
        const { and = {}, fields = ['name'] } = options
        this.init('filter')
        const andValues = cleanup(and, {
          delEmptyString: true,
          delNull: true,
        })
        if (q) {
          this.setFilter({
            $or: []
              .concat(fields)
              .filter(Boolean)
              .map((field) => ({
                [field]: Object.assign({ $like: `%${String(q).trim()}%` }),
              })),
            ...andValues,
          })
        } else {
          this.setFilter(Object.assign({}, andValues))
        }
      },
    },
  )
})

module.exports = withFilter
