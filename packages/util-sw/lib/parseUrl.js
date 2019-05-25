'use strict'
/**
 * Parse url
 * @function parseUrl
 * @param {string} urlString
 * @returns {URL}
 */
const URL = require('url-parse')

/** @lends parseUrl */
function parseUrl(urlString, options = {}) {
  const { parseQuery = true } = options
  return new URL(urlString, parseQuery)
}

parseUrl.forRegistration = (registration, options = {}) => {
  const url = registration && registration.active && registration.scriptURL
  if (!url) {
    return null
  }
  return parseUrl(url, options)
}

module.exports = parseUrl
