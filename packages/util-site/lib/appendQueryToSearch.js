'use strict'

const { get } = require('bwindow')
const qs = require('qs')
const queryFromSearch = require('./queryFromSearch')

/**
 * @memberof module:@the-/util-site
 * @function appendQueryToSearch
 * @param {Object} query
 */
function appendQueryToSearch(query) {
  const search = `?${qs.stringify({
    ...queryFromSearch(),
    ...query,
  })}`

  const history = get('history')
  history.replaceState(null, null, search)
}

module.exports = appendQueryToSearch
