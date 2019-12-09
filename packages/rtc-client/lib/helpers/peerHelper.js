'use strict'

const wrtc = require('wrtc')
const { get } = require('@the-/window')
const PeerEvents = require('../constants/PeerEvents')
const debug = require('debug')('the:rtc:client')
const RTCPeerConnection = get('RTCPeerConnection') || wrtc.RTCPeerConnection

exports.createPeer = function createPeer(
  rid,
  {
    iceServers = [],
    iceTransportPolicy,
    onDataChannel,
    onDisconnect,
    onFail,
    onIceCandidate,
    onStream,
    pid,
    purpose,
    rid: remoteRid,
    stream,
  } = {},
) {
  const peer = new RTCPeerConnection({ iceServers, iceTransportPolicy })
  const handlers = {
    [PeerEvents.CONNECTION_STATE_CHANGE]: () => {
      debug('connectionState', peer.connectionState, { rid })
      switch (peer.connectionState) {
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
      console.error('[TheRTCClient] Peer error', e, { rid })
    },
    [PeerEvents.ICE_CANDIDATE]: (e) => {
      debug('iceCandidate', e.candidate && e.candidate.sdpMid, rid)
      onIceCandidate && onIceCandidate(e.candidate, { rid })
    },
    [PeerEvents.ICE_CONNECTION_STATE_CHANGE]: () => {
      debug('iceconnectionState', peer.iceConnectionState)
    },
    [PeerEvents.NEGOTIATION_NEEDED]: () => {
      debug('negotiation needed', { rid })
    },
    [PeerEvents.SIGNALING_STATE_CHANGE]: () => {
      debug('signalingState', peer.signalingState, { rid })
    },
    [PeerEvents.TRACK]: (e) => {
      const { track } = e
      const [stream] = e.streams || []
      debug('track', track.kind, track.id, { rid, stream: stream && stream.id })
      if (stream) {
        onStream && onStream(stream, { peer, track })
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
      debug('addTrack', rid, track.kind, stream.id)
      peer.addTrack(track, stream)
    }
  }

  peer.extra = { channels: {}, pid, purpose, rid: remoteRid }

  return peer
}
