/**
 * @memberOf module:@the-/server.helpers
 * @function queryFromUrl
 */
'use strict'

const qs = require('qs')
const { parse: parseUrl } = require('url')

/** @lends module:@the-/server.helpers.queryFromUrl */
function queryFromUrl(urlString) {
  const { query } = parseUrl(urlString)
  return qs.parse(query)
}

module.exports = queryFromUrl
