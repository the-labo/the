'use strict'

const { TheLock } = require('@the-/lock')

/**
 * Queue with concurrency
 * @memberof module:@the-/queue
 * @param concurrency - Hom many tasks runs in parallel
 * @returns {Object}
 */
function ConcurrentQueue(concurrency = 10) {
  const lock = new TheLock()
  const state = {
    promises: [],
  }

  return {
    push(task) {
      void lock.acquire('push', async () => {
        const isFull = state.promises.length >= concurrency
        if (isFull) {
          await Promise.race(state.promises)
        }

        const promise = task()
        state.promises.push(promise)
        Promise.resolve(promise).then(() => {
          state.promises = state.promises.filter((p) => p !== promise)
        })
      })
    },
    /**
     * 現状積まれている処理が全部終わるまで待つ
     * @returns {Promise<void>}
     */
    async wait() {
      await lock.acquire('push', async () => {
        await Promise.all(state.promises)
      })
    },
  }
}

module.exports = ConcurrentQueue
