'use strict'

const {
  ByteLengthQueuingStrategy,
  CountQueuingStrategy,
  ReadableStream,
  TransformStream,
  WritableStream,
} = require('web-streams-polyfill/ponyfill')

// `module.exports` overrides these `exports.*`, but still needs them for lebab (https://github.com/lebab/lebab)
exports.ByteLengthQueuingStrategy = ByteLengthQueuingStrategy
exports.CountQueuingStrategy = CountQueuingStrategy
exports.ReadableStream = ReadableStream
exports.TransformStream = TransformStream
exports.WritableStream = WritableStream

module.exports = {
  ByteLengthQueuingStrategy,
  CountQueuingStrategy,
  ReadableStream,
  TransformStream,
  WritableStream,
}
