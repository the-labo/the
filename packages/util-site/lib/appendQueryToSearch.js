/**
 * @function appendQueryToSearch
 * @param {Object} query
 */
'use strict'

const { get } = require('bwindow')
const qs = require('qs')
const queryFromSearch = require('./queryFromSearch')

/** @lends appendQueryToSearch */
function appendQueryToSearch(query) {
  const search =
    '?' +
    qs.stringify({
      ...queryFromSearch(),
      ...query,
    })

  const history = get('history')
  history.replaceState(null, null, search)
}

module.exports = appendQueryToSearch
