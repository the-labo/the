'use strict'

/**
 * Wrap controller with client
 * @function withClient
 */
const qs = require('qs')

/** @lends withClient */
function withClient(Class) {
  class WithClient extends Class {
    clientUrlFor(pathname, query = {}) {
      const {
        client: { host = 'localhost', protocol = 'http:' },
      } = this
      const url = new URL(pathname, protocol + host)
      url.search = qs.stringify(query)
      return url.href
    }
  }

  return WithClient
}

module.exports = withClient
