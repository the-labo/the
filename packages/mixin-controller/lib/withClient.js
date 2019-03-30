/**
 * Wrap controller with client
 * @function withClient
 */
'use strict'

const qs = require('qs')
const { format: formatUrl } = require('url')

/** @lends withClient */
function withClient(Class) {
  class WithClient extends Class {
    clientUrlFor(pathname, query = {}) {
      const { host, protocol } = this.client
      return formatUrl({
        host,
        pathname,
        protocol,
        search: qs.stringify(query),
      })
    }
  }

  return WithClient
}

module.exports = withClient
