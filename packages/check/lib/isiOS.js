/**
 * Detect iOS or not
 * @function isiOS
 * @returns {Boolean}
 */
'use strict'

const Bowser = require('bowser')
const getUserAgent = require('./helpers/getUserAgent')

/** @lends isiOS */
function isiOS(options = {}) {
  const { userAgent = getUserAgent() } = options
  if (!userAgent) {
    return false
  }
  const browser = Bowser.getParser(userAgent)
  return browser.isOS('iOS')
}

isiOS.webview = (options = {}) => {
  const { userAgent = getUserAgent() } = options
  const browser = Bowser.getParser(userAgent)
  if (!isiOS({ userAgent })) {
    return false
  }
  const isSafari = browser.isBrowser('Safari')
  const version = browser.getBrowserVersion()
  // ios webview detected as safari without version
  // https://github.com/lancedikson/bowser/issues/222#issuecomment-400822271
  return !!isSafari && !version
}

module.exports = isiOS
