'use strict'

/**
 * Create generator from readable
 * @memberof module:@the-/stream.helpers
 * @function generatorFromReadable
 */
/** @lends module:@the-/stream.generatorFromReadable */
function generatorFromReadable(readable) {
  return {
    [Symbol.asyncIterator]: () => generator,
    next: async () => {
      if (readable.closed) {
        return { done: true, value: void 0 }
      }
      const { done, value } = await readable.read()
      return { done, value }
    },
  }
}

module.exports = generatorFromReadable
