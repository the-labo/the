/**
 * withQuery mixin
 * @function withQuery
 * @param {function} Class - Class to mix
 * @returns {function} Mixed class
 */
'use strict'

const { cleanup } = require('asobj')
const { get } = require('bwindow')
const qs = require('qs')
const asClassMixin = require('./helpers/asClassMixin')
const injectProperties = require('./helpers/injectProperties')

/** @lends withQuery */
const withQuery = asClassMixin((Class) => {
  injectProperties(Class, {
    /**
     * Get query from search
     * @param {string} [search=location.search]
     * @returns {Object}
     */
    getQueryFromSearch(search = get('location.search')) {
      if (!search) {
        return {}
      }
      return qs.parse(search, { ignoreQueryPrefix: true })
    },
    /**
     * Merge additional query into search
     * @param {Object} query
     */
    mergeQueryToSearch(query) {
      const merged = cleanup(
        {
          ...this.getQueryFromSearch(),
          ...query,
        },
        {
          delEmptyString: true,
          delNull: true,
        },
      )
      const search = '?' + qs.stringify(merged)

      const { history } = this
      {
        if (history.location.search !== search) {
          const { hash } = history.location
          history.replace({
            hash,
            search,
          })
        }
      }
    },
    /**
     * Query with search
     * @param search - Location search string
     * @returns {object}
     */
    queryWithSearch(search) {
      return qs.parse(search, { ignoreQueryPrefix: true })
    },
  })
})

module.exports = withQuery
