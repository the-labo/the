'use strict'

const wrtc = require('wrtc')
const { get } = require('@the-/window')
const PeerEvents = require('../constants/PeerEvents')
const debug = require('debug')('the:rtc:client')

const RTCPeerConnection = get('RTCPeerConnection') || wrtc.RTCPeerConnection

exports.createPeer = function createPeer({
  iceServers = [],
  iceTransportPolicy,
  localRid,
  localStream,
  onClose,
  onConnect,
  onDataChannel,
  onDisconnect,
  onFail,
  onIceCandidate,
  onStream,
  peerOptional = [],
  pid,
  purpose,
  remoteRid,
} = {}) {
  const peer = new RTCPeerConnection(
    {
      iceServers,
      iceTransportPolicy,
    },
    {
      optional: peerOptional,
    },
  )
  const handlers = {
    [PeerEvents.CONNECTION_STATE_CHANGE]: () => {
      const { connectionState } = peer
      debug('connectionState', connectionState, { rid: localRid })
      switch (connectionState) {
        case 'closed': {
          onClose && onClose({ peer })
          break
        }
        case 'connected': {
          onConnect && onConnect({ peer })
          break
        }
        case 'disconnected': {
          onDisconnect && onDisconnect({ peer })
          break
        }
        case 'failed': {
          onFail && onFail({ peer })
          break
        }
        default:
          break
      }
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
      console.error('[TheRTCClient] Peer error', e, { rid: remoteRid })
    },
    [PeerEvents.ICE_CANDIDATE]: (e) => {
      debug('iceCandidate', e.candidate && e.candidate.sdpMid, localRid)
      onIceCandidate && onIceCandidate(e.candidate, { rid: remoteRid })
    },
    [PeerEvents.ICE_CONNECTION_STATE_CHANGE]: () => {
      debug('iceconnectionState', peer.iceConnectionState)
    },
    [PeerEvents.NEGOTIATION_NEEDED]: () => {
      debug('negotiation needed', { rid: remoteRid })
    },
    [PeerEvents.SIGNALING_STATE_CHANGE]: () => {
      debug('signalingState', peer.signalingState, { rid: remoteRid })
    },
    [PeerEvents.TRACK]: (e) => {
      const { track } = e
      const [remoteStream] = e.streams || []
      debug('track', track.kind, track.id, {
        rid: remoteRid,
        stream: remoteStream && remoteStream.id,
      })
      if (remoteStream) {
        onStream && onStream(remoteStream, { peer, track })
        peer.extra.remoteStream = remoteStream

        track.addEventListener('mute', (ev) => {
          debug('mute', ev)
          const { target: track } = ev
          remoteStream.removeTrack(track)
          onStream && onStream(remoteStream, { peer, track })
        })
        track.addEventListener('unmute', (ev) => {
          const { target: track } = ev
          debug('unmute', ev)
          remoteStream.addTrack(track)
          onStream && onStream(remoteStream, { peer, track })
        })
      }
    },
  }
  for (const [event, handler] of Object.entries(handlers)) {
    peer.addEventListener(event, (...args) => {
      handler(...args)
    })
  }
  if (localStream) {
    for (const track of localStream.getTracks()) {
      debug('addTrack', localRid, track.kind, localStream.id)
      peer.addTrack(track, localStream)
    }
  }

  peer.extra = {
    channels: {},
    localRid,
    localStream,
    pid,
    purpose,
    remoteRid,
    remoteStream: null,
  }

  return peer
}
