/**
 * @module Converters
 */
'use strict'

const NoopConverter = (v) => v
const UInt8ArrayConverter = (v) => new Uint8Array(v)

exports.NoopConverter = NoopConverter
exports.UInt8ArrayConverter = UInt8ArrayConverter

module.exports = { NoopConverter, UInt8ArrayConverter }
