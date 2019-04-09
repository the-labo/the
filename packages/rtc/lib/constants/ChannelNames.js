/**
 * Name of channels
 * @enum {string} ChannelNames
 */
'use strict'

module.exports = Object.freeze(
  /** @lends ChannelNames */
  {
    /** @deprecated */
    DEFAULT_CHANNEL: 'default',
    /** Pipe line to send binary data */
    PUB_SUB_CHANNEL: 'pub-sub',
    /** Pipe line to send binary data */
    STREAM_CHANNEL: 'stream',
    /** Pipe line to send binary data */
    STREAM_CONTROL_CHANNEL: 'stream-control',
  },
)
