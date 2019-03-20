'use strict'

const qs = require('qs')
const { parse: parseUrl } = require('url')

/** @lends queryFromUrl */
function queryFromUrl(urlString) {
  const { query } = parseUrl(urlString)
  return qs.parse(query)
}

module.exports = queryFromUrl
