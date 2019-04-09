/**
 * Mixin for channel
 * @function channelMix
 * @param {function} Class
 * @returns {function} Class
 */
'use strict'

const { ChannelNames } = require('../constants')

/** @lends channelMix */
function channelMix(Class) {
  class ChannelMixed extends Class {
    constructor() {
      super(...arguments)
      this._pubsubChannelSubscriptions = {}
    }

    receiveDataChannel(channel, { from }) {
      const channelName = channel.label
      const isMeta = /^@@/.test(channelName)
      if (isMeta) {
        return
      }
      switch (channelName) {
        case ChannelNames.DEFAULT_CHANNEL:
          break
        case ChannelNames.PUB_SUB_CHANNEL:
          this.receivePubSubChannel(channel, { from })
          break
        case ChannelNames.STREAM_CHANNEL:
          break
        case ChannelNames.STREAM_CONTROL_CHANNEL:
          break
        default:
          throw new Error(`[TheRTCClient] Unknown channel: ${channelName}`)
      }
    }

    receivePubSubChannel(channel, { from }) {
      channel.addEventListener('message', ({ data: serialized }) => {
        const { payload, topic } = this.deserializeChannelData(serialized)
        const subscriptions = this._pubsubChannelSubscriptions[topic] || []
        for (const subscription of subscriptions) {
          subscription({ from, payload, topic })
        }
      })
    }

    /**
     * Subscribe topic on pub-sub channel
     * @param {string} topic
     * @param {function} callback
     * @returns {function(): void}
     */
    subscribePubSubChannel(topic, callback) {
      const subscription = (received) => {
        callback(received)
      }
      this._pubsubChannelSubscriptions[topic] = [
        ...(this._pubsubChannelSubscriptions[topic] || []),
        subscription,
      ]
      const unsubscribe = () =>
        this.unsubscribePubSubChannel(topic, subscription)
      return unsubscribe
    }

    /**
     * Unsubscribe topic on pub-sub channel
     * @param {string} topic
     * @param {function} [subscription] - subscription to unbind
     */
    unsubscribePubSubChannel(topic, subscription) {
      if (subscription) {
        this._pubsubChannelSubscriptions[topic] = (
          this._pubsubChannelSubscriptions[topic] || []
        ).filter((filtering) => filtering !== subscription)
      } else {
        this._pubsubChannelSubscriptions[topic] = []
      }
    }
  }

  return ChannelMixed
}

module.exports = channelMix