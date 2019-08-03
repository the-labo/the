'use strict'

/**
 * @class SFUProxyEdge
 */
const {
  RTCIceCandidate,
  RTCPeerConnection,
  RTCSessionDescription,
} = require('wrtc')
const { PeerEvents } = require('../constants')
const waitChannelOpen = require('../helpers/waitChannelOpen')

/** @lends SFUProxyEdge */
class SFUProxyEdge {
  constructor({ iceServers }) {
    this.connection = new RTCPeerConnection({ iceServers }, {})
    this.receivedIces = []
    this.sendingIceCandidates = []
    this.channels = {}
    this.tracks = []
    {
      const { connection } = this
      // Register initial channel
      {
        const channel = connection.createDataChannel('@@sfu')
        this.registerChannel(channel)
      }
      connection.addEventListener(PeerEvents.ICE_CANDIDATE, (e) => {
        this.sendingIceCandidates.push(e.candidate)
      })
      connection.addEventListener(PeerEvents.DATA_CHANNEL, (e) => {
        const { channel } = e
        this.registerChannel(channel)
      })
      connection.addEventListener(PeerEvents.TRACK, (e) => {
        const { streams, track } = e
        this.tracks.push({ streams, track })
      })
    }
  }

  listenIceCandidate(callback) {
    while (this.sendingIceCandidates.length > 0) {
      callback(this.sendingIceCandidates.shift())
    }
    const { connection } = this
    connection.addEventListener(PeerEvents.ICE_CANDIDATE, (e) => {
      const candidate = this.sendingIceCandidates.shift() || e.candidate
      callback(candidate)
    })
  }

  pipe(edge) {
    const { connection } = this

    // Pipe channels
    for (const channel of Object.values(this.channels)) {
      void edge.receiveCounterpartChannel(channel)
    }
    connection.addEventListener(PeerEvents.DATA_CHANNEL, (e) => {
      void edge.receiveCounterpartChannel(e.channel)
    })

    // Pipe tracks
    for (const { streams, track } of this.tracks) {
      void edge.receiveCounterpartTrack(track, streams)
    }
    connection.addEventListener(PeerEvents.TRACK, (e) => {
      void edge.receiveCounterpartTrack(e.track, e.streams)
    })
  }

  registerChannel(channel) {
    const { label: channelName } = channel
    if (this.channels[channelName]) {
      throw new Error(
        `[${this.constructor.name}] Channel already exists: ${channelName}`,
      )
    }

    this.channels[channelName] = channel
  }

  async addIceCandidate(ice) {
    const { connection } = this
    try {
      await connection.addIceCandidate(new RTCIceCandidate(ice))
    } catch (e) {
      console.warn(e, {
        connectionState: connection.connectionState,
        remoteDescription: connection.remoteDescription,
        signalingState: connection.signalingState,
      })
    }
  }

  async close() {
    const { connection } = this
    for (const channel of Object.values(this.channels)) {
      await channel.close()
    }
    await connection.close()
  }

  async receiveCounterpartChannel(counterpartChannel, options = {}) {
    const { retry = 5, retryInterval = 100 } = options
    const { label: channelName } = counterpartChannel
    const channel = this.channels[channelName]
    if (!channel) {
      const failed = retry <= 0
      if (failed) {
        throw new Error(
          `[${
            this.constructor.name
          }] Unknown channel: "${channelName}" (known: ${Object.keys(
            this.channels,
          )})`,
        )
      } else {
        setTimeout(
          () =>
            this.receiveCounterpartChannel(counterpartChannel, {
              retry: retry - 1,
              retryInterval: retryInterval * 2,
            }),
          retryInterval,
        )
      }

      return
    }

    counterpartChannel.addEventListener('message', async (m) => {
      await waitChannelOpen(channel, { prefix: this.constructor.name })
      channel.send(m.data)
    })
    channel.addEventListener('message', async (m) => {
      await waitChannelOpen(counterpartChannel, {
        prefix: this.constructor.name,
      })
      counterpartChannel.send(m.data)
    })
  }

  async receiveCounterpartTrack(track, streams) {
    const { connection } = this
    if (connection.connectionState !== 'new') {
      console.warn(
        `[${this.constructor.name}] Adding track after connection created`,
      )
    }

    connection.addTrack(track, ...streams)
  }

  async receiveICE(ice) {
    const { connection } = this
    if (!ice.ice) {
      return
    }

    if (!connection.remoteDescription) {
      this.receivedIces.push(ice)
      return
    }

    await this.addIceCandidate(ice.ice)
  }

  async setLocalDescription(desc) {
    const { connection } = this
    await connection.setLocalDescription(new RTCSessionDescription(desc))
  }

  async setRemoteDescription(desc) {
    const { connection } = this
    await connection.setRemoteDescription(new RTCSessionDescription(desc))
    while (this.receivedIces.length > 0) {
      const ice = this.receivedIces.shift()
      await this.addIceCandidate(ice.ice)
    }
  }
}

module.exports = SFUProxyEdge
