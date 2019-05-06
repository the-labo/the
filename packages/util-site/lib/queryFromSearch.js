/**
 * Get query from search
 * @memberof module:@the-/util-site
 * @function queryFromSearch
 * @param {string} search
 * @returns {Object}
 */
'use strict'

const { get } = require('bwindow')
const qs = require('qs')

/** @lends module:@the-/util-site.queryFromSearch */
function queryFromSearch(search = get('location.search')) {
  if (!search) {
    return {}
  }
  return qs.parse(search, { ignoreQueryPrefix: true })
}

module.exports = queryFromSearch
