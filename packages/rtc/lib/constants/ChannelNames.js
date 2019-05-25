'use strict'
/**
 * Name of channels
 * @memberof module:@the-/rtc.constants
 * @enum {string}
 * @name ChannelNames
 */
module.exports = Object.freeze(
  /** @lends module:@the-/rtc.constants.ChannelNames */
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
