/**
 * Mixin for turn
 * @memberof module:@the-/rtc.mixins
 * @function turnMix
 * @param {function()} Class
 * @returns {function()} Class
 */
'use strict'

const crypto = require('crypto')

/** @lends module:@the-/rtc.mixins.turnMix */
function turnMix(Class) {
  class TurnMixed extends Class {
    turnCredentialsFor(config) {
      const { expiry = 86400, secret, url } = config
      for (const key of ['secret', ',url']) {
        if (!config[key]) {
          throw new Error(`[TheRTC] config.${key} is required`)
        }
      }
      const hmac = crypto.createHmac('sha1', secret)
      // default to 86400 seconds timeout unless specified
      const username =
        Math.floor(new Date().getTime() / 1000) + parseInt(expiry, 10) + ''
      hmac.update(username)
      return {
        credential: hmac.digest('base64'),
        urls: [url],
        username,
      }
    }
  }

  return TurnMixed
}

module.exports = turnMix
