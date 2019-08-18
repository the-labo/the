'use strict'

const LRUCache = require('lru-cache')

/**
 * @memberof module:@the-/cache
 * @class TheCache
 * @augments LRUCache
 * @see https://github.com/isaacs/node-lru-cache#readme
 */
class TheCache extends LRUCache {
  /**
   * Get cache or initialize and set
   * @param {string} key - Cache key
   * @param {function(Promise)} initializer - Initializer async function
   * @returns {Promise<undefined>}
   */
  async for(key, initializer) {
    const cached = this.get(key)
    if (cached) {
      return cached
    }

    const initialized = await initializer()
    this.set(key, initialized)
    return initialized
  }
}

module.exports = TheCache
