/**
 * Mixin for sfu
 * @function sfuMix
 * @param {function} Class
 * @returns {function} Class
 */
'use strict'

const SFUProxyPool = require('../sfu/SFUProxyPool')

/** @lends sfuMix */
function sfuMix(Class) {
  class SfuMixed extends Class {
    constructor() {
      super(...arguments)
      this.sfuEnabled = false
    }

    cleanupSFU(peerIds) {
      for (const pid of peerIds) {
        void this.sfuProxyPool.clear(pid)
      }
    }

    setupSFU({ iceServers, sendAnswer, sendIce, sendOffer }) {
      this.sfuProxyPool = new SFUProxyPool({ iceServers })
      this.sfuSignaling = { sendAnswer, sendIce, sendOffer }
    }

    async processPeerAnswerForSFU(pid, answer) {
      const proxy = this.sfuProxyPool.get(pid)
      return proxy.processAnswer(answer)
    }

    async processPeerICEForSFU(pid, ice) {
      const proxy = this.sfuProxyPool.get(pid)
      if (!proxy) {
        console.warn(`[TheRTC] proxy not found for pid: ${pid}`)
        return
      }
      return await proxy.processICE(ice)
    }

    async processPeerOfferForSFU(pid, offer) {
      const proxy = this.sfuProxyPool.new(pid, {
        answerer: offer.to,
        offerer: offer.from,
        purpose: offer.purpose,
        signaling: this.sfuSignaling,
      })

      await proxy.processOffer(offer)
    }
  }

  return SfuMixed
}

module.exports = sfuMix
