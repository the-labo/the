'use strict'
/**
 * Webrtc proxy connections
 * @class SFUProxy
 */
const SFUProxyEdgeAnswerer = require('./SFUProxyEdgeAnswerer')
const SFUProxyEdgeOfferer = require('./SFUProxyEdgeOfferer')

class SFUProxy {
  constructor(config = {}) {
    const { answerer, iceServers, offerer, pid, purpose, signaling } = config
    if (!iceServers) {
      console.warn('[SFUProxy] iceServers is empty')
    }
    const answererEdge = new SFUProxyEdgeAnswerer({
      iceServers,
    })
    const offererEdge = new SFUProxyEdgeOfferer({
      iceServers,
    })
    this.signaling = signaling
    this.purpose = purpose
    this.pid = pid
    this.offerer = offerer
    this.offererEdge = offererEdge
    this.answerer = answerer
    this.answererEdge = answererEdge

    offererEdge.pipe(answererEdge)
    answererEdge.pipe(offererEdge)

    this.closed = false
  }

  iceForAnswerer(candidate) {
    const { answerer, offerer, pid, purpose } = this
    return {
      from: offerer,
      ice: candidate,
      pid,
      purpose,
      to: answerer,
    }
  }

  iceForOfferer(candidate) {
    const { answerer, offerer, pid, purpose } = this
    return {
      from: answerer,
      ice: candidate,
      pid,
      purpose,
      to: offerer,
    }
  }

  async close() {
    this.closed = true
    await this.offererEdge.close()
    await this.answererEdge.close()
  }

  async processAnswer(answer) {
    const { answererEdge, offererEdge, signaling } = this
    await answererEdge.receiveAnswer(answer)
    const proxyAnswer = await offererEdge.proxyAnswer(answer)
    await signaling.sendAnswer(proxyAnswer)
  }

  async processICE(ice) {
    const { answererEdge, offererEdge } = this
    if (ice.from === this.offerer) {
      await offererEdge.receiveICE(ice)
    }
    if (ice.from === this.answerer) {
      await answererEdge.receiveICE(ice)
    }
  }

  async processOffer(offer) {
    const { answererEdge, offererEdge, signaling } = this
    await offererEdge.receiveOffer(offer)
    const proxyOffer = await answererEdge.proxyOffer(offer)
    await signaling.sendOffer(proxyOffer)
    answererEdge.listenIceCandidate((candidate) => {
      const ice = this.iceForAnswerer(candidate)
      signaling.sendIce(ice)
    })
    offererEdge.listenIceCandidate(() => {
      // const ice = this.iceForOfferer(candidate)
      // TODO
      // signaling.sendIce(ice)
    })
  }
}

module.exports = SFUProxy
