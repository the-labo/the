'use strict'

const Bowser = require('bowser')
const getUserAgent = require('./helpers/getUserAgent')

/**
 * Detect chrome or not
 * @memberof module:@the-/check
 * @function isChrome
 * @param [options={}]
 * @returns {boolean}
 */
function isChrome(options = {}) {
  const { userAgent = getUserAgent() } = options
  if (!userAgent) {
    return false
  }

  const browser = Bowser.getParser(userAgent)
  return browser.isBrowser('Chrome')
}

module.exports = isChrome
