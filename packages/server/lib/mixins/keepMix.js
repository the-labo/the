/**
 * Mixin to keep
 * @memberOf module:@the-/server.mixins
 * @function keepMix
 * @param {function} Class
 * @returns {function} Class
 */
'use strict'

/** @lends module:@the-/server.mixins.keepMix */
function keepMix(Class) {
  /**
   * module:@the-/server.mixins.keepMix
   * @inner
   */
  class KeepMixed extends Class {
    constructor() {
      super(...arguments)
      this._keepings = {}
      this.keepDuration = 4 * 1000
    }

    handleKeepTick(cid, iid, { controllerName, keepDuration } = {}) {
      void this.sendIORPCKeep(cid, iid, keepDuration)
      this.addInvocationKeepCountMetrics(controllerName, 1)
    }

    setKeepDuration(keepDuration) {
      this.keepDuration = keepDuration
    }

    startKeepTimer(cid, iid, { controllerName } = {}) {
      const { keepDuration } = this
      const keepTimer = setInterval(() => {
        this.handleKeepTick(cid, iid, { controllerName, keepDuration })
      }, keepDuration).unref()

      this._keepings[cid] = this._keepings[cid] || {}
      this._keepings[cid][iid] = { controllerName, keepTimer }

      this.addKeepStartCountMetrics(controllerName)
    }

    stopAllKeepTimers() {
      for (const cid of Object.keys(this._keepings)) {
        this.stopKeepTimersFor(cid)
      }
    }

    stopKeepTimer(cid, iid) {
      const keeping = (this._keepings[cid] || {})[iid]
      if (!keeping) {
        console.warn('Keep timer not found for:', cid, iid)
        return
      }
      const { controllerName, keepTimer } = keeping
      clearInterval(keepTimer)
      delete this._keepings[cid][iid]
      this.addKeepStopCountMetrics(controllerName)
    }

    stopKeepTimerIfNeeded(cid, iid) {
      const has = (this._keepings[cid] || {})[iid]
      if (!has) {
        return
      }
      this.stopKeepTimer(cid, iid)
    }

    stopKeepTimersFor(cid) {
      const _keepings = this._keepings[cid] || {}
      for (const iid of Object.keys(_keepings)) {
        this.stopKeepTimer(cid, iid)
      }
    }
  }

  return KeepMixed
}

module.exports = keepMix
