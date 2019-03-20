/**
 * Parse caller URL
 * @memberOf module:@the-/client
 * @function parseClientUrl
 * @param {Object|string} - URL string or config
 * @returns {string} - Parsed url
 */
'use strict'

const { get } = require('bwindow')
const { DEFAULT_URL } = require('rfunc-constants')
const {
  format: formatUrl,
  parse: parseUrl,
  resolve: resolveUrl,
} = require('url')

/** @lends parseClientUrl */
function parseClientUrl(url) {
  if (typeof url === 'string') {
    const parsed = parseUrl(url)
    if (parsed.pathname === '/') {
      let suggestion = resolveUrl(url, DEFAULT_URL)
      console.warn(
        `[TheClient] Passed URL "${url}" seems to be wrong. Did you mean "${suggestion}"`,
      )
    }
    return url
  }
  const protocol = url.protocol || get('location.protocol') || 'http:'
  const defaultPort = protocol === 'https:' ? 443 : 80
  const {
    host = undefined,
    hostname = get('location.hostname') || 'localhost',
    pathname = DEFAULT_URL,
    port = get('location.port') || defaultPort,
  } = url
  return formatUrl({
    host,
    hostname,
    pathname,
    port,
    protocol,
  })
}

module.exports = parseClientUrl
