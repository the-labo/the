'use strict'

/**
 * Detect Firefox or not
 * @memberof module:@the-/check
 * @function isFirefox
 * @returns {boolean}
 */
const Bowser = require('bowser')
const getUserAgent = require('./helpers/getUserAgent')

/** @lends module:@the-/check.isFirefox */
function isFirefox(options = {}) {
  const { userAgent = getUserAgent() } = options
  if (!userAgent) {
    return false
  }

  const browser = Bowser.getParser(userAgent)
  return browser.isBrowser('Firefox')
}

module.exports = isFirefox
