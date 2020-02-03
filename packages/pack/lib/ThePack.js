'use strict'

const {
  decode: msgpackDecode,
  encode: msgpackEncode,
} = require('@msgpack/msgpack')

/**
 * Pack handler
 * @memberof module:@the-/pack
 * @class ThePack
 */
class ThePack {
  constructor() {
    this.decode = this.decode.bind(this)
    this.encode = this.encode.bind(this)
  }

  /**
   * Bind methods
   * @returns {Object}
   */
  bind() {
    return {
      decode: this.decode.bind(this),
      encode: this.encode.bind(this),
    }
  }

  /**
   * Decode buffer
   * @param {ArrayBuffer} encoded - Buffer to decode
   * @returns {*} Decoded data
   */
  decode(encoded) {
    if (encoded === null) {
      return encoded
    }

    try {
      return msgpackDecode(encoded)
    } catch (e) {
      const isBuffer =
        encoded instanceof ArrayBuffer || encoded instanceof Uint8Array
      if (!isBuffer) {
        return encoded
      }

      throw new Error(
        `[ThePack] Failed to decode buffer: ${encoded} (reason ${e.message})`,
      )
    }
  }

  /**
   * Encode data into buffer
   * @param {*} data - Encoded data
   * @returns {ArrayBuffer} Encoded buffer
   */
  encode(data) {
    if (data === null) {
      return null
    }

    try {
      return msgpackEncode(data)
    } catch (e) {
      throw new Error(`[ThePack] Failed to encode data: ${e.message}`)
    }
  }
}

module.exports = ThePack
