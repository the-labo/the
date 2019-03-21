/**
 * Get query from search
 * @function queryFromSearch
 * @param {string} search
 * @returns {Object}
 */
'use strict'

const { get } = require('bwindow')
const qs = require('qs')

/** @lends queryFromSearch */
function queryFromSearch(search = get('location.search')) {
  if (!search) {
    return {}
  }
  return qs.parse(search, { ignoreQueryPrefix: true })
}

module.exports = queryFromSearch
