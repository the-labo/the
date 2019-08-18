'use strict'

const qs = require('qs')

/**
 * @memberof module:@the-/util-client
 * @function queryWithSearch
 * @param search
 * @returns {*}
 */
function queryWithSearch(search) {
  return qs.parse(search, { ignoreQueryPrefix: true })
}

module.exports = queryWithSearch
