'use strict'

const Bowser = require('bowser')
const getUserAgent = require('./helpers/getUserAgent')

/**
 * Detect Firefox or not
 * @memberof module:@the-/check
 * @function isFirefox
 * @param [options={}]
 * @returns {boolean}
 */
function isFirefox(options = {}) {
  const { userAgent = getUserAgent() } = options
  if (!userAgent) {
    return false
  }

  const browser = Bowser.getParser(userAgent)
  return browser.isBrowser('Firefox')
}

module.exports = isFirefox
