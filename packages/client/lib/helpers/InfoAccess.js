'use strict'

const { get } = require('bwindow')

const INFO_KEY = 'the.info'

/**
 * @memberof module:@the-/client.helpers
 * @function InfoAccess
 * @returns {Object}
 */
function InfoAccess({ fetch, infoKey = INFO_KEY }) {
  /**
   * @memberof module:@the-/client.helpers.InfoAccess
   * @inner
   * @namespace infoAccess
   */
  const infoAccess = {
    state: {
      serverInfo: null,
    },
    /**
     * Fetch server info
     * @param {Object} [options={}]
     * @returns {Promise<Object>}
     */
    async serverInfo(options = {}) {
      const { force = false, infoUrl = '/the/info.json' } = options
      const loaded = get(infoKey)
      if (!force && loaded) {
        return loaded
      }

      const {
        state: { serverInfo: cached },
      } = infoAccess
      if (!force && cached) {
        return cached
      }

      const response = await fetch(infoUrl)
      const info = response.json()
      infoAccess.state.serverInfo = info
      return info
    },
  }

  return infoAccess
}

module.exports = InfoAccess
