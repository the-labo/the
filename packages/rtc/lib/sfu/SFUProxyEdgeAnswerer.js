'use strict'

const SFUProxyEdge = require('./SFUProxyEdge')
const { ChannelNames } = require('../constants')

/**
 * @class SFUProxyEdgeAnswerer
 * @augments SFUProxyEdge
 */
class SFUProxyEdgeAnswerer extends SFUProxyEdge {
  constructor() {
    super(...arguments)

    for (const channelName of Object.values(ChannelNames)) {
      const channel = this.connection.createDataChannel(channelName)
      this.registerChannel(channel)
    }
  }

  async proxyOffer(offer) {
    const { from, pid, purpose, to } = offer
    const { connection } = this
    const proxyDesc = await connection.createOffer()
    await connection.setLocalDescription(proxyDesc)
    return { desc: proxyDesc, from, pid, purpose, sfu: true, to }
  }

  async receiveAnswer(answer) {
    await this.setRemoteDescription(answer.desc)
  }
}

module.exports = SFUProxyEdgeAnswerer
