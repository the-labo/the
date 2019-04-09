/**
 * Mixin for serialize
 * @function serializeMix
 * @param {function} Class
 * @returns {function} Class
 */
'use strict'

const { Converters, ThePack } = require('@the-/pack')

const { decode, encode } = new ThePack({
  convert: Converters.UInt8ArrayConverter,
})

/** @lends serializeMix */
function serializeMix(Class) {
  class SerializeMixed extends Class {
    deserializeChannelData(data, options = {}) {
      return decode(Buffer.from(new Uint8Array(data)))
    }

    serializeChannelData(data, options = {}) {
      return encode(data)
    }
  }

  return SerializeMixed
}

module.exports = serializeMix
