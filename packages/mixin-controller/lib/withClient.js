/**
 * Wrap controller with client
 * @function withClient
 */
'use strict'

const qs = require('qs')

/** @lends withClient */
function withClient(Class) {
  class WithClient extends Class {
    clientUrlFor(pathname, query = {}) {
      const { host = 'localhost', protocol = 'http:' } = this.client
      const url = new URL(pathname, protocol + host)
      url.search = qs.stringify(query)
      return url.href
    }
  }

  return WithClient
}

module.exports = withClient
