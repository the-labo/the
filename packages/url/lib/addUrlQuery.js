/**
 * Add query to url string
 * @memberof module:@the-/url
 * @function addQuery
 * @param {string} urlString - URL to add
 * @param {Object} query - Query to add
 * @returns {string} Added url string
 */
'use strict'

const qs = require('qs')

/** @lends addUrlQuery */
function addUrlQuery(urlString, query = {}) {
  const isRelative = urlString.match(/^\//)
  const url = isRelative
    ? new URL(urlString, 'relative:///')
    : new URL(urlString)
  const queryString = url.search.replace(/^\?/, '')
  url.search = qs.stringify({ ...qs.parse(queryString), ...query })
  return isRelative ? [url.pathname, url.search].join('') : url.href
}

module.exports = addUrlQuery
