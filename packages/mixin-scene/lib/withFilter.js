/**
 * withFilter mixin
 * @function withFilter
 * @param {function} Class - Class to mix
 * @returns {function} Mixed class
 */
'use strict'

const { cleanup } = require('asobj')
const asClassMixin = require('./helpers/asClassMixin')
const injectProperties = require('./helpers/injectProperties')

/** @lends withFilter */
const withFilter = asClassMixin((Class) => {
  injectProperties(Class, {
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
  })
})

module.exports = withFilter
