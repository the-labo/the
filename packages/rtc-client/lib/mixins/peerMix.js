'use strict'

/**
 * Mixin for peer
 * @memberof module:@the-/rtc.constants.mixins
 * @function peerMix
 * @param {function()} Class
 * @returns {function()} Class
 */
const wrtc = require('wrtc')
const { get } = require('@the-/window')
const ChannelNames = require('../constants/ChannelNames')
const PeerEvents = require('../constants/PeerEvents')
const debug = require('debug')('the:rtc:client')

const RTCPeerConnection = get('RTCPeerConnection') || wrtc.RTCPeerConnection
const RTCSessionDescription =
  get('RTCSessionDescription') || wrtc.RTCSessionDescription
const RTCIceCandidate = get('RTCIceCandidate') || wrtc.RTCIceCandidate

/** @lends module:@the-/rtc.constants.mixins.peerMix */
function peerMix(Class) {
  class PeerMixed extends Class {
    constructor() {
      super(...arguments)
      this.peers = {}
    }

    createPeer({
      iceServers = [],
      onDataChannel,
      onIceCandidate,
      onStream,
      pid,
      purpose,
      stream,
    } = {}) {
      const peer = new RTCPeerConnection({ iceServers }, {})
      // const debug = (...a) => console.log(`[${this.rid}]`, ...a)
      const handlers = {
        [PeerEvents.CONNECTION_STATE_CHANGE]: () => {
          debug('connectionState', peer.connectionState, this.rid)
        },
        [PeerEvents.DATA_CHANNEL]: (e) => {
          const {
            channel,
            channel: { label: channelName },
          } = e

          peer.extra.channels[channelName] = channel
          onDataChannel && onDataChannel(channel)
        },
        [PeerEvents.ERROR]: (e) => {
          // TODO Handle error
          console.error('[TheRTCClient] Peer error', e)
        },
        [PeerEvents.ICE_CANDIDATE]: (e) => {
          debug('iceCandidate', e.candidate && e.candidate.sdpMid, this.rid)
          onIceCandidate && onIceCandidate(e.candidate)
        },
        [PeerEvents.ICE_CONNECTION_STATE_CHANGE]: () => {
          debug('iceconnectionState', peer.iceConnectionState)
        },
        [PeerEvents.NEGOTIATION_NEEDED]: () => {
          debug('negotiation needed', this.rid)
        },
        [PeerEvents.SIGNALING_STATE_CHANGE]: () => {
          debug('signalingState', peer.signalingState, this.rid)
        },
        [PeerEvents.TRACK]: (e) => {
          const [stream] = e.streams || []
          debug('stream', stream && stream.id)
          if (stream) {
            onStream && onStream(stream, { peer })
          }
        },
      }
      for (const [event, handler] of Object.entries(handlers)) {
        peer.addEventListener(event, (...args) => {
          handler(...args)
        })
      }
      if (stream) {
        for (const track of stream.getTracks()) {
          console.log('adding track', this.rid, track.kind, stream.id)
          peer.addTrack(track, stream)
        }
      }

      peer.extra = { channels: {}, pid, purpose }

      return peer
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
      onStream,
      pid,
      purpose,
      remoteDescription,
      stream,
    } = {}) {
      const peer = this.createPeer({
        iceServers,
        onDataChannel,
        onStream,
        pid,
        purpose,
        stream,
      })
      this.setPeer(pid, peer)
      await peer.setRemoteDescription(
        new RTCSessionDescription(remoteDescription),
      )
      const localDesc = await peer.createAnswer()
      await peer.setLocalDescription(localDesc)

      return peer
    }

    async createOfferPeer({
      iceServers,
      onDataChannel,
      onIceCandidate,
      onStream,
      pid,
      purpose,
      stream,
    } = {}) {
      const peer = this.createPeer({
        iceServers,
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
      const peer = this.getPeer(pid, { warnWhenNotFound: true })
      if (!peer) {
        return
      }

      await peer.addIceCandidate(new RTCIceCandidate(ice))
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
