/**
 * @memberof module:@the-/util-client
 * @function queryWithSearch
 */
'use strict'

const qs = require('qs')

/** @lends module:@the-/util-client.queryWithSearch */
function queryWithSearch(search) {
  return qs.parse(search, { ignoreQueryPrefix: true })
}

module.exports = queryWithSearch
