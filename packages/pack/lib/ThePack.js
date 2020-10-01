'use strict'

const { Decoder, Encoder } = require('@msgpack/msgpack')

/**
 * Pack handler
 * @memberof module:@the-/pack
 * @class ThePack
 */
class ThePack {
  constructor() {
    this.decode = this.decode.bind(this)
    this.encode = this.encode.bind(this)

    this.encoder = new Encoder()
    this.decoder = new Decoder()
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
      return this.decoder.decode(encoded)
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
      return this.encoder.encode(data)
    } catch (e) {
      throw new Error(
        `[ThePack] Failed to encode data: ${e.message} ( ${JSON.stringify(
          data,
        )} )`,
      )
    }
  }
}

module.exports = ThePack
