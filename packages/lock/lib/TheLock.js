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
      const promise = Promise.resolve(locks[key])
        .catch(() => {
          // 前回の promise 返却時にエラーハンドリングしているはず
        })
        .then(async () => task())
      locks[key] = promise
      return promise
    },
  }
}

module.exports = TheLock
