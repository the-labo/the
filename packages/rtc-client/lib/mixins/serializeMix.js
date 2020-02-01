'use strict'

const { ThePack } = require('@the-/pack')

const { decode, encode } = new ThePack({})

/**
 * Mixin for serialize
 * @memberof module:@the-/rtc.constants.mixins
 * @function serializeMix
 * @param {function()} Class
 * @returns {function()} Class
 */
function serializeMix(Class) {
  class SerializeMixed extends Class {
    deserializeChannelData(data, options = {}) {
      return decode(data)
    }

    serializeChannelData(data, options = {}) {
      return encode(data)
    }
  }

  return SerializeMixed
}

module.exports = serializeMix
