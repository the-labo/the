'use strict'

const { mkdirpAsync, writeFileAsync } = require('asfs')
const { isMaster } = require('cluster')
const path = require('path')

/**
 * Mixins for info
 * @memberof module:@the-/server.helpers
 * @function InfoFlusher
 * @param {string} filename
 * @param {function()} getter - Info getter
 * @returns {Object}
 */
function InfoFlusher(filename, getter) {
  const state = {
    flushInfoTimer: -1,
  }
  /**
   * @memberof module:@the-/server.helpers.InfoFlusher
   * @inner
   * @namespace infoFlusher */
  const infoFlusher = {
    state,
    /** Flush info into file */
    async flushInfo() {
      const info = getter()
      await mkdirpAsync(path.dirname(filename))
      await writeFileAsync(filename, JSON.stringify(info, null, 2))
    },
    async startInfoFlush() {
      if (!isMaster) {
        return
      }

      state.flushInfoTimer = setInterval(() => {
        void infoFlusher.flushInfo()
      }, 1100).unref()
      await infoFlusher.flushInfo()
    },
    async stopInfoFlush() {
      if (!isMaster) {
        return
      }

      clearInterval(state.flushInfoTimer)
      await infoFlusher.flushInfo()
    },
  }

  return infoFlusher
}

module.exports = InfoFlusher
