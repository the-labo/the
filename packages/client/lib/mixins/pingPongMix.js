/**
 * @memberOf module:@the-/client
 * @function pingPongMix
 * @param {function} Class - Class to mix
 * @returns {function} Mixed class
 */
'use strict'

const DEFAULT_PING_URL = '/the/ping'

/** @lends pingPongMix */
function pingPongMix(Class) {
  class PingPongMixed extends Class {
    /**
     * Send ping to the serve and callback when pong received
     * @param {function} callback
     * @param {Object} [options={}}
     * @returns {function(): void}
     */
    pingPongAnd(callback, options = {}) {
      const {
        interval = 1000,
        pingUrl = DEFAULT_PING_URL,
        retryMax = 100,
      } = options
      let count = 0
      let timer = -1
      const tick = async () => {
        count++
        if (retryMax <= count) {
          close()
          throw new Error(`Exceed retry max`)
        }
        const ok = await this.ping({ pingUrl })
        if (ok) {
          close()
          await callback()
        } else {
          timer = setTimeout(tick, interval)
          timer.unref && timer.unref()
        }
      }
      const close = () => clearTimeout(timer)
      setTimeout(tick, interval)
      return close
    }

    async ping(otpions = {}) {
      const { pingUrl = DEFAULT_PING_URL } = otpions
      const response = await this.fetch(pingUrl)
      return response.ok
    }
  }

  return PingPongMixed
}

module.exports = pingPongMix
