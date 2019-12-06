'use strict'

const asleep = require('asleep')
const wrtc = require('wrtc')
const { TheLock } = require('@the-/lock')
const { get } = require('@the-/window')
const ChannelNames = require('../constants/ChannelNames')
const { createPeer } = require('../helpers/peerHelper')
const debug = require('debug')('the:rtc:client')

const RTCSessionDescription =
  get('RTCSessionDescription') || wrtc.RTCSessionDescription
const RTCIceCandidate = get('RTCIceCandidate') || wrtc.RTCIceCandidate

/**
 * Mixin for peer
 * @memberof module:@the-/rtc.constants.mixins
 * @function peerMix
 * @param {function()} Class
 * @returns {function()} Class
 */
function peerMix(Class) {
  class PeerMixed extends Class {
    constructor() {
      super(...arguments)
      this.peers = {}
      this.peerLock = new TheLock()
    }

    delPeer(pid) {
      delete this.peers[pid]
    }

    getPeer(pid, options = {}) {
      const peer = this.peers[pid]
      if (!peer) {
        const { warnWhenNotFound } = options
        if (warnWhenNotFound) {
          const known = Object.keys(this.peers)
          console.warn(
            `[TheRTCClient] Peer not found: ${pid} (known: (${JSON.stringify(
              known,
            )})`,
          )
        }
      }

      return peer
    }

    getPeerDataChannel(pid, channelName) {
      const peer = this.getPeer(pid)
      const { channels } = (peer && peer.extra) || {}
      return channels && channels[channelName]
    }

    getPeersByPurpose(purpose) {
      return Object.values(this.peers).filter(
        (peer) => peer.extra.purpose === purpose,
      )
    }

    setPeer(pid, peer) {
      if (this.peers[pid]) {
        throw new Error(`[TheRTCClient] Peer already exists with id: ${pid}`)
      }

      this.peers[pid] = peer
    }

    async createAnswerPeer({
      iceServers,
      onDataChannel,
      onDisconnect,
      onFail,
      onStream,
      pid,
      purpose,
      remoteDescription,
      stream,
    } = {}) {
      const peer = createPeer(this.rid, {
        iceServers,
        onDataChannel,
        onDisconnect,
        onFail,
        onStream,
        pid,
        purpose,
        stream,
      })
      this.setPeer(pid, peer)
      await this.peerLock.acquire(pid, async () => {
        await this.setPeerRemoteDesc(pid, remoteDescription)
        const localDesc = await peer.createAnswer()
        await peer.setLocalDescription(localDesc)
      })

      return peer
    }

    async createOfferPeer({
      iceServers,
      onDataChannel,
      onDisconnect,
      onFail,
      onIceCandidate,
      onStream,
      pid,
      purpose,
      stream,
    } = {}) {
      const peer = createPeer(this.rid, {
        iceServers,
        onDisconnect,
        onFail,
        onIceCandidate,
        onStream,
        pid,
        purpose,
        stream,
      })
      this.setPeer(pid, peer)
      for (const channelName of Object.values(ChannelNames)) {
        const channel = peer.createDataChannel(channelName)
        peer.extra.channels[channelName] = channel
        onDataChannel && onDataChannel(channel)
      }

      const desc = await peer.createOffer()
      await peer.setLocalDescription(desc)
      return peer
    }

    async destroyAllPeers() {
      for (const pid of Object.keys(this.peers)) {
        await this.destroyPeer(pid)
      }
    }

    async destroyPeer(pid) {
      const peer = this.getPeer(pid)
      const {
        extra: { channels },
      } = peer
      for (const [, channel] of Object.entries(channels)) {
        await channel.close()
      }
      await peer.close()
      this.delPeer(pid)
    }

    async peerDataChannel(pid, channelName) {
      const channel = this.getPeerDataChannel(pid, channelName)
      if (!channel) {
        throw new Error(`[TheRTCClient] Unknown channel: ${channelName}`)
      }

      if (channel.readyState !== 'open') {
        await new Promise((resolve, reject) => {
          const onOpen = () => {
            channel.removeEventListener('open', onOpen)
            resolve()
            clearTimeout(timeoutTimer)
          }
          channel.addEventListener('open', onOpen)
          const timeoutTimer = setTimeout(
            () =>
              reject(
                new Error(
                  `[TheRTCClient] Failed to open channel: ${channelName}`,
                ),
              ),
            30000,
          )
        })
      }

      return channel
    }

    async setPeerICECandidate(pid, ice) {
      await this.peerLock.acquire(pid, async () => {
        const peer = this.getPeer(pid, { warnWhenNotFound: true })
        if (!peer) {
          return
        }
        debug('setPeerICECandidate', pid, ice, {
          signalingState: peer.signalingState,
        })
        // TODO ちょっと待たないとうまくつながらない。(原因はまだ分かっていない)
        await asleep(500)
        await peer.addIceCandidate(new RTCIceCandidate(ice))
      })
    }

    async setPeerRemoteDesc(pid, desc) {
      const peer = this.getPeer(pid, { warnWhenNotFound: true })
      if (!peer) {
        return
      }

      await peer.setRemoteDescription(new RTCSessionDescription(desc))
    }
  }

  return PeerMixed
}

module.exports = peerMix
