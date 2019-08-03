'use strict'

/**
 * Parse caller URL
 * @memberof module:@the-/client.helpers
 * @function parseClientUrl
 * @param {Object|string} - URL string or config
 * @returns {string} - Parsed url
 */
const { get } = require('bwindow')
const { DEFAULT_URL } = require('rfunc-constants')
const { format: formatUrl } = require('url')

/** @lends module:@the-/client.helpers.parseClientUrl */
function parseClientUrl(url) {
  if (typeof url === 'string') {
    const { pathname } = new URL(url)
    if (pathname === '/') {
      const { href: suggestion } = new URL(DEFAULT_URL, url)
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
