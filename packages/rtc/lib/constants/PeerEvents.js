'use strict'

/**
 * Events for peer
 * @memberof module:@the-/rtc.constants
 * @enum {string}
 * @name PeerEvents
 */
module.exports = Object.freeze(
  /** @lends module:@the-/rtc.constants.PeerEvents */
  {
    CONNECTION_STATE_CHANGE: 'connectionstatechange',
    DATA_CHANNEL: 'datachannel',
    ERROR: 'error',
    ICE_CANDIDATE: 'icecandidate',
    ICE_CONNECTION_STATE_CHANGE: 'iceconnectionstatechange',
    NEGOTIATION_NEEDED: 'negotiationneeded',
    SIGNALING_STATE_CHANGE: 'signalingstatechange',
    TRACK: 'track',
  },
)
