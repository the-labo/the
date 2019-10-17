'use strict'

const DEFAULT_PING_URL = '/the/ping'

/**
 * @memberof module:@the-/client.mixins
 * @function PingSender
 * @param config
 * @returns {*}
 */
function PingSender(config) {
  const { fetch } = config

  const pingSender = {
    /**
     * Send ping to the serve and callback when pong received
     * @param {Function} callback - Callback func
     * @param {Object} [options={}] - Optional setting
     * @returns {function()}
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
          throw new Error('Exceed retry max')
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
    },
    async ping(otpions = {}) {
      const { pingUrl = DEFAULT_PING_URL } = otpions
      const response = await fetch(pingUrl)
      return response.ok
    },
  }

  return pingSender
}

module.exports = PingSender