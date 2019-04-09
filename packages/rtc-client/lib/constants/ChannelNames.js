/**
 * ChannelNames
 * @module ChannelNames
 */
'use strict'

const ChannelNames = Object.freeze(
  /** @lends ChannelNames */
  {
    DEFAULT_CHANNEL: 'default',
    PUB_SUB_CHANNEL: 'pub-sub',
    STREAM_CHANNEL: 'stream',
    STREAM_CONTROL_CHANNEL: 'stream-control',
  }
)

module.exports = ChannelNames
