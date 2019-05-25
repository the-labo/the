'use strict'
/**
 * Detect chrome or not
 * @memberof module:@the-/check
 * @function isChrome
 * @returns {boolean}
 */
const Bowser = require('bowser')
const getUserAgent = require('./helpers/getUserAgent')

/** @lends module:@the-/check.isChrome */
function isChrome(options = {}) {
  const { userAgent = getUserAgent() } = options
  if (!userAgent) {
    return false
  }
  const browser = Bowser.getParser(userAgent)
  return browser.isBrowser('Chrome')
}

module.exports = isChrome
