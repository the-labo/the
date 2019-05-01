/**
 * Topology type of web rtc
 * @memberof module:@the-/rtc.constants
 * @enum {string}
 * @name TopologyTypes
 * @see https://webrtcglossary.com/mesh/
 * @see https://webrtcglossary.com/sfu/
 * @see https://webrtcglossary.com/mcu/
 */
'use strict'

const TopologyTypes = Object.freeze(
  /** @lends module:@the-/rtc.constants.TopologyTypes */
  {
    MESH: 'mesh',
    SFU: 'sfu',
  },
)

module.exports = TopologyTypes
