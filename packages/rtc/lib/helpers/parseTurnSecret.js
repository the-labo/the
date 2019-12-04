'use strict'

const crypto = require('crypto')

const toSec = (v) => Math.floor(Number(v) / 1000)

/**
 * @memberof module:@the-/rtc.helpers
 * @function parseTurnSecret
 * @param {string} name
 * @param {string} secret
 * @param {number} expiry
 * @returns {Object} Parsed values
 */
function parseTurnSecret(name, secret, expiry) {
  const hmac = crypto.createHmac('sha1', secret)
  const expiredAt = toSec(new Date().getTime() + expiry)
  const username = `${expiredAt}:${name}`
  hmac.setEncoding('base64')
  hmac.write(username)
  hmac.end()
  const credential = hmac.read()
  return { credential, username }
}

module.exports = parseTurnSecret
