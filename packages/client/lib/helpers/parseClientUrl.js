'use strict'

const { get } = require('bwindow')
const { DEFAULT_URL } = require('rfunc-constants')

/**
 * Parse caller URL
 * @memberof module:@the-/client.helpers
 * @function parseClientUrl
 * @param {Object|string} url - URL string or config
 * @returns {string} - Parsed url
 */
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
    hostname = get('location.hostname') || 'localhost',
    pathname = DEFAULT_URL,
    port = get('location.port') || defaultPort,
  } = url
  return `${protocol}//${hostname}:${port}${pathname}`
}

module.exports = parseClientUrl
