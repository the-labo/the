'use strict'
/**
 * @memberof module:@the-/util-site
 * @function appendQueryToSearch
 * @param {Object} query
 */
const { get } = require('bwindow')
const qs = require('qs')
const queryFromSearch = require('./queryFromSearch')

/** @lends module:@the-/util-site.appendQueryToSearch */
function appendQueryToSearch(query) {
  const search = `?${qs.stringify({
    ...queryFromSearch(),
    ...query,
  })}`

  const history = get('history')
  history.replaceState(null, null, search)
}

module.exports = appendQueryToSearch
