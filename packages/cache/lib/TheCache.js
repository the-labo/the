'use strict'

const LRUCache = require('lru-cache')

/**
 * @memberof module:@the-/cache
 * @class TheCache
 * @augments LRUCache
 * @see https://github.com/isaacs/node-lru-cache#readme
 */
class TheCache extends LRUCache {
  static withLocalStorage(key, options = {}) {
    const { storageMaxAge = options.maxAge, ...cacheOptions } = options
    const localStorage = typeof window !== 'undefined' && window.localStorage
    if (!localStorage) {
      console.warn('localStorage not supported')
      return
    }

    const storageKey = `the:cache:${key}`
    const save = (values) =>
      (localStorage[storageKey] = JSON.stringify({
        at: new Date().getTime(),
        data: values,
      }))
    const cache = new this({
      dispose: () => {
        save(cache.dump())
      },
      ...cacheOptions,
    })
    const restored =
      localStorage[storageKey] && JSON.parse(localStorage[storageKey])
    const shouldLoad =
      !!restored && (!storageMaxAge || new Date() - restored.at < storageMaxAge)
    if (shouldLoad) {
      cache.load(restored.data)
    }

    const { set } = cache
    cache.set = function setAndSave() {
      set.apply(cache, arguments)
      save(cache.dump())
    }

    return cache
  }

  constructor(options) {
    super(options)
    const { maxAge } = this
    if (maxAge <= 0) {
      console.warn('[TheCache] maxAge should be longer than 0')
    }
    const pruneTimer = setInterval(() => {
      this.prune()
    }, maxAge)
    if (pruneTimer.unref) {
      pruneTimer.unref()
    }
  }

  /**
   * Get cache or initialize and set
   * @param {string} key - Cache key
   * @param {function(Promise)} initializer - Initializer async function
   * @returns {Promise<*>}
   */
  async for(key, initializer) {
    const cached = this.get(key)
    if (cached) {
      return cached
    }

    const initialized = await initializer()
    if (typeof initialized !== 'undefined') {
      this.set(key, initialized)
    }

    return initialized
  }
}

module.exports = TheCache
