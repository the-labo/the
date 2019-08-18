'use strict'

const qs = require('qs')
const { get } = require('@the-/window')

/**
 * @memberof module:@the-/server.helpers
 * @function queryFromUrl
 */
function queryFromUrl(urlString) {
  const { search } = new URL(
    urlString,
    get('location.origin') || 'http://localhost',
  )
  return qs.parse(search.replace(/^\?/, ''))
}

module.exports = queryFromUrl
