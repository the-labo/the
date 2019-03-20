/**
 * Detect Firefox or not
 * @function isFirefox
 * @returns {Boolean}
 */
'use strict'

const Bowser = require('bowser')
const getUserAgent = require('./helpers/getUserAgent')

/** @lends isFirefox */
function isFirefox(options = {}) {
  const { userAgent = getUserAgent() } = options
  if (!userAgent) {
    return false
  }
  const browser = Bowser.getParser(userAgent)
  return browser.isBrowser('Firefox')
}

module.exports = isFirefox
