'use strict'
/**
 * withQuery mixin
 * @deprecated
 * @function withQuery
 * @deprecated
 * @memberof module:@the-/mixin-scene
 * @param {function()} Class - Class to mix
 * @returns {function()} Mixed class
 */
/**
 * @memberof module:@the-/mixin-scene.withQuery
 * @inner
 * @class WithQueryMixed
 */
const { cleanup } = require('asobj')
const { get } = require('bwindow')
const qs = require('qs')
const asClassMixin = require('./helpers/asClassMixin')
const injectProperties = require('./helpers/injectProperties')

/** @lends module:@the-/mixin-scene.withQuery */
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
       * @param {string} search - Location search string
       * @returns {Object}
       */
      queryWithSearch(search) {
        return qs.parse(search, { ignoreQueryPrefix: true })
      },
    },
  )
})

module.exports = withQuery
