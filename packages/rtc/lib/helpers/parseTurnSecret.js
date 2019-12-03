'use strict'

const crypto = require('crypto')

/**
 * @memberof module:@the-/rtc.helpers
 * @function parseTurnSecret
 * @param {string} secret
 * @param {number} expiry
 * @returns {Object} Parsed values
 */
function parseTurnSecret(secret, expiry) {
  const hmac = crypto.createHmac('sha1', secret)
  const when = Math.floor(new Date().getTime() / 1000)
  const duration = parseInt(expiry, 10)
  const username = `${when}:${duration}`
  hmac.setEncoding('base64')
  hmac.write(username)
  hmac.end()
  const credential = hmac.read()
  return { credential, username }
}

module.exports = parseTurnSecret
