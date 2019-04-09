/**
 * PeerEvents
 * @module PeerEvents
 */
'use strict'

const PeerEvents = Object.freeze(
  /** @lends PeerEvents */
  {
    CONNECTION_STATE_CHANGE: 'connectionstatechange',
    DATA_CHANNEL: 'datachannel',
    ERROR: 'error',
    ICE_CANDIDATE: 'icecandidate',
    ICE_CONNECTION_STATE_CHANGE: 'iceconnectionstatechange',
    NEGOTIATION_NEEDED: 'negotiationneeded',
    SIGNALING_STATE_CHANGE: 'signalingstatechange',
    TRACK: 'track',
  }
)

module.exports = PeerEvents
