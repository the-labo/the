/**
 * Detect chrome or not
 * @function isChrome
 * @returns {Boolean}
 */
'use strict'

const Bowser = require('bowser')
const getUserAgent = require('./helpers/getUserAgent')

/** @lends isChrome */
function isChrome(options = {}) {
  const { userAgent = getUserAgent() } = options
  if (!userAgent) {
    return false
  }
  const browser = Bowser.getParser(userAgent)
  return browser.isBrowser('Chrome')
}

module.exports = isChrome
