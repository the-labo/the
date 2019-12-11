'use strict'

const get = require('./get')

/**
 * Open page
 * @memberof module:@the-/window
 * @function open
 * @param {string} url - URL to open
 * @returns {*}
 */
function open(url) {
  const location = get('location')
  if (!location) {
    console.warn('Failed to open because there no location object')
    return
  }

  location.href = url
}

module.exports = open
