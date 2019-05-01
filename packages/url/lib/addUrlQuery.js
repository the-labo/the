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
const { format, parse } = require('url')

/** @lends addUrlQuery */
function addUrlQuery(urlString, query = {}) {
  const parsed = parse(urlString)
  const { host, pathname, protocol, query: queryString } = parsed
  return format({
    host,
    pathname,
    protocol,
    search: qs.stringify({ ...qs.parse(queryString), ...query }),
  })
}

module.exports = addUrlQuery
