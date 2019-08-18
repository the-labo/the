'use strict'

/**
 * @memberof module:@the-/mixin-scene.withQuery
 * @class WithQueryMixed
 * @inner
 */
const { cleanup } = require('asobj')
const { get } = require('bwindow')
const qs = require('qs')
const asClassMixin = require('./helpers/asClassMixin')
const injectProperties = require('./helpers/injectProperties')

/**
 * withQuery mixin
 * @memberof module:@the-/mixin-scene
 * @function withQuery
 * @deprecated
 * @deprecated
 * @param {function()} Class - Class to mix
 * @returns {function()} Mixed class
 */
const withQuery = asClassMixin((Class) => {
  injectProperties(
    Class,
    /** @lends module:@the-/mixin-scene.withQuery~WithQueryMixed */
    {
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
        const search = `?${qs.stringify(merged)}`

        const { history } = this
        if (history.location.search !== search) {
          const {
            location: { hash },
          } = history
          history.replace({
            hash,
            search,
          })
        }
      },
      /**
       * Query with search
       * @deprecated
       * @param {string} search - Location search string
       * @returns {Object}
       */
      queryWithSearch(search) {
        console.warn('queryWithSearch is now deprecated')
        return qs.parse(search, { ignoreQueryPrefix: true })
      },
    },
  )
})

module.exports = withQuery
