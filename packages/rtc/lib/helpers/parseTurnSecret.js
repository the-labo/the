'use strict'

/**
 * @memberof module:@the-/rtc.helpers
 * @function parseTurn secret
 * @param {string} secret
 * @returns {Object} Parsed values
 */
const crypto = require('crypto')

/** @lends module:@the-/rtc.helpers.parseTurnSecret */
function parseTurnSecret(secret, expiry) {
  const hmac = crypto.createHmac('sha1', secret)
  const when = Math.floor(new Date().getTime() / 1000)
  const duration = parseInt(expiry, 10)
  const username = `${when}${duration}`
  hmac.update(username)
  const credential = hmac.digest('base64')
  return { credential, username }
}

module.exports = parseTurnSecret
