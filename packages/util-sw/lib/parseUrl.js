/**
 * Parse url
 * @function parseUrl
 * @param {string} urlString
 * @returns {URL}
 */
'use strict'

const URL = require('url-parse')

/** @lends parseUrl */
function parseUrl(urlString, options = {}) {
  const { parseQuery = true } = options
  return new URL(urlString, parseQuery)
}

module.exports = parseUrl
