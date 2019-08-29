'use strict'

/**
 * Lock
 * @function TheLock
 * @returns {Object}
 */
function TheLock() {
  const locks = {}
  return {
    /**
     * @param {string} key
     * @param {function(): Promise} task
     * @returns {Promise}
     */
    async acquire(key, task) {
      await locks[key]
      const promise = Promise.resolve(locks[key]).then(async () => task())
      locks[key] = promise
      return promise
    },
  }
}

module.exports = TheLock
