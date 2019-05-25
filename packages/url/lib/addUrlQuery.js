'use strict'
/**
 * Add query to url string
 * @memberof module:@the-/url
 * @function addQuery
 * @param {string} urlString - URL to add
 * @param {Object} query - Query to add
 * @returns {string} Added url string
 */
const qs = require('qs')
const { get } = require('@the-/window')

/** @lends addUrlQuery */
function addUrlQuery(urlString, query = {}) {
  const isRelative = urlString.match(/^\//)
  const url = isRelative
    ? new URL(urlString, get('location.origin') || 'relative:///')
    : new URL(urlString)
  const queryString = url.search.replace(/^\?/, '')
  url.search = qs.stringify({ ...qs.parse(queryString), ...query })
  return isRelative ? [url.pathname, url.search].join('') : url.href
}

module.exports = addUrlQuery
