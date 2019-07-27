/**
 * Mixin to keep
 * @memberof module:@the-/server.helpers
 * @function RPCKeeper
 * @param {function()} Class
 * @returns {function()} Class
 */
'use strict'

/** @lends module:@the-/server.helpers.RPCKeeper */
function RPCKeeper({ ioConnector, keepDuration = 4 * 1000, metricsCounter }) {
  const kept = {}
  /**
   * @memberof module:@the-/server.helpers.RPCKeeper
   * @inner
   * @namespace rpcKeeper
   */
  const rpcKeeper = {
    handleKeepTick(cid, iid, { controllerName, keepDuration } = {}) {
      if (ioConnector) {
        void ioConnector.sendRPCKeep(cid, iid, keepDuration)
      }
      if (metricsCounter) {
        metricsCounter.addInvocationKeepCount(controllerName, 1)
      }
    },

    startKeepTimer(cid, iid, { controllerName } = {}) {
      const keepTimer = setInterval(() => {
        rpcKeeper.handleKeepTick(cid, iid, { controllerName, keepDuration })
      }, keepDuration).unref()

      kept[cid] = kept[cid] || {}
      kept[cid][iid] = { controllerName, keepTimer }

      if (metricsCounter) {
        metricsCounter.addKeepStartCount(controllerName)
      }
    },

    stopAllKeepTimers() {
      for (const cid of Object.keys(kept)) {
        rpcKeeper.stopKeepTimersFor(cid)
      }
    },

    stopKeepTimer(cid, iid) {
      const keeping = (kept[cid] || {})[iid]
      if (!keeping) {
        console.warn('Keep timer not found for:', cid, iid)
        return
      }
      const { controllerName, keepTimer } = keeping
      clearInterval(keepTimer)
      delete kept[cid][iid]
      if (metricsCounter) {
        metricsCounter.addKeepStopCount(controllerName)
      }
    },

    stopKeepTimerIfNeeded(cid, iid) {
      const has = (kept[cid] || {})[iid]
      if (!has) {
        return
      }
      rpcKeeper.stopKeepTimer(cid, iid)
    },

    stopKeepTimersFor(cid) {
      const values = kept[cid] || {}
      for (const iid of Object.keys(values)) {
        rpcKeeper.stopKeepTimer(cid, iid)
      }
    },
  }

  return rpcKeeper
}

module.exports = RPCKeeper
