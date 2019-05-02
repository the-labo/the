/**
 * @memberof module:@the-/client.mixins
 * @function infoMix
 * @param {function} Class
 * @returns {function}
 */
'use strict'

const { get } = require('bwindow')
const INFO_KEY = 'the.info'

/** @lends module:@the-/client.mixins.infoMix */
function infoMix(Class) {
  /**
   * @memberof module:@the-/client.mixins.infoMix
   * @inner
   */
  class InfoMixed extends Class {
    constructor() {
      super(...arguments)
      this.infoKey = INFO_KEY
    }

    /**
     * Fetch server info
     * @param {Object} [options={}]
     * @returns {Promise<Object>}
     */
    async serverInfo(options = {}) {
      const { force = false, infoUrl = '/the/info.json' } = options
      const loaded = get(this.infoKey)
      if (!force && loaded) {
        return loaded
      }
      const cached = this._serverInfo
      if (!force && cached) {
        return cached
      }
      const response = await this.fetch(infoUrl)
      const info = response.json()
      this._serverInfo = info
      return info
    }
  }

  return InfoMixed
}

module.exports = infoMix
