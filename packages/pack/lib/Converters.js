'use strict'
/**
 * @memberof module:@the-/pack
 * @namespace Converters
 */
const NoopConverter = (v) => v
const UInt8ArrayConverter = (v) => new Uint8Array(v)

exports.NoopConverter = NoopConverter
exports.UInt8ArrayConverter = UInt8ArrayConverter

module.exports = Object.assign(
  /** @lends module:@the-/pack.Converters */
  {
    NoopConverter,
    UInt8ArrayConverter,
  },
)
