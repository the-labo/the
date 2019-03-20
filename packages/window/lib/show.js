/**
 * Show page
 * @memberOf module:@the-/window
 * @function show
 * @param {string} url - URL to show
 * @returns {*}
 */
'use strict'

const get = require('./get')

/** show */
function show(url) {
  const location = get('location')
  if (!location) {
    console.warn(`Failed to show because there no location object`)
    return
  }
  location.href = url
}

module.exports = show
