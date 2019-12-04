'use strict'

const SFUProxyEdge = require('./SFUProxyEdge')

/**
 * @class SFUProxyEdgeOfferer
 * @augments SFUProxyEdge
 */
class SFUProxyEdgeOfferer extends SFUProxyEdge {
  async proxyAnswer(answer) {
    const { from, pid, purpose, to } = answer
    const { connection } = this
    const proxyDesc = await connection.createAnswer()
    await this.setLocalDescription(proxyDesc)
    return { desc: proxyDesc, from, pid, purpose, sfu: true, to }
  }

  async receiveOffer(offer) {
    await this.setRemoteDescription(offer.desc)
  }
}

module.exports = SFUProxyEdgeOfferer
