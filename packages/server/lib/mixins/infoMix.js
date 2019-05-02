/**
 * Mixins for info
 * @memberof module:@the-/server.mixins
 * @function infoMix
 * @param {function} Class
 * @returns {function} Class
 */
'use strict'

const { mkdirpAsync, writeFileAsync } = require('asfs')
const { isMaster } = require('cluster')
const path = require('path')

/** @lends module:@the-/server.mixins.infoMix */
function infoMix(Class) {
  /**
   * @memberof module:@the-/server.mixins.infoMix
   * @inner
   */
  class InfoMixed extends Class {
    constructor() {
      super(...arguments)
      this.flushInfoTimer = -1
    }

    /** Server info */
    info() {
      return {
        ...(this.additionalInfo || {}),
        alive: !this.closeAt,
        controllers: this.controllerSpecs,
        langs: this.langs,
        metrics: this.metrics,
        uptime: new Date() - this.listenAt,
      }
    }

    /** Flush info into file */
    async flushInfo() {
      const { infoFile } = this
      const info = this.info()
      await mkdirpAsync(path.dirname(infoFile))
      await writeFileAsync(infoFile, JSON.stringify(info, null, 2))
    }

    async startInfoFlush(infoFile) {
      if (!isMaster) {
        return
      }
      this.infoFile = infoFile
      this.flushInfoTimer = setInterval(() => {
        void this.flushInfo()
      }, 1.1 * 1000).unref()
      await this.flushInfo()
    }

    async stopInfoFlush() {
      if (!isMaster) {
        return
      }
      clearInterval(this.flushInfoTimer)
      await this.flushInfo()
    }
  }

  return InfoMixed
}

module.exports = infoMix
