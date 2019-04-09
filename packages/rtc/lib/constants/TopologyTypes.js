/**
 * Topology type of web rtc
 * @enum {string} TopologyTypes
 * @see https://webrtcglossary.com/mesh/
 * @see https://webrtcglossary.com/sfu/
 * @see https://webrtcglossary.com/mcu/
 */
'use strict'

const TopologyTypes = Object.freeze(
  /** @lends TopologyTypes */
  {
    MESH: 'mesh',
    SFU: 'sfu',
  },
)

module.exports = TopologyTypes
