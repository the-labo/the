/**
 * @class TheQueue
 */
'use strict'

const asleep = require('asleep')

/** @lends TheQueue */
class TheQueue {
  constructor(options = {}) {
    const { autoStart = false, max = 1000, name = '(anonymous)' } = options
    this.max = max
    this.name = name
    this.pending = []
    this.running = false
    this.metrics = {
      finishedCount: 0,
    }
    if (autoStart) {
      this.start()
    }
  }

  get length() {
    return this.pending.length
  }

  assertRunning() {
    if (!this.running) {
      throw new Error(`[TheQueue][${this.name}] Queue is not running`)
    }
  }

  /**
   * Push next task
   * @param {function} task - Task to execute
   */
  push(task) {
    const isFull = this.length >= this.max
    if (isFull) {
      throw new Error(
        `[TheQueue][${this.name}] Too many tasks (max: ${this.max}, pending: ${
          this.length
        })`,
      )
    }
    return new Promise((resolve, reject) => {
      const call = async () => {
        await Promise.resolve(task())
          .then(resolve)
          .catch(reject)
      }
      this.pending.push(call)
      void this.consumeIfNeeded()
    })
  }

  /**
   * Start queue
   */
  start() {
    this.running = true
    void this.consumeIfNeeded()
  }

  /**
   * Stop queue
   */
  stop() {
    this.assertRunning()
    this.running = false
  }

  async consume() {
    const task = this.pending.shift()
    if (!task) {
      return
    }
    await task()
    this.metrics.finishedCount += 1
    await this.consumeIfNeeded()
  }

  async consumeIfNeeded() {
    if (!this.running) {
      return
    }
    if (this.length === 0) {
      return
    }
    await this.consume()
  }

  /**
   * Wait until queue got empty
   * @param {Object} [options={}] - Optional settings
   * @param {number} [options.timeout=60*1000] - Timeout duration
   * @returns {Promise<void>}
   */
  async wait(options = {}) {
    const { interval = 100, timeout = 60 * 1000 } = options
    const startedAt = new Date()
    while (this.length > 0) {
      this.assertRunning()
      await asleep(interval)
      const passed = new Date() - startedAt
      const tooLong = timeout < passed
      if (tooLong) {
        throw new Error(
          `[TheQueue][${
            this.name
          }] Timeout to wait (timeout: ${timeout}ms, passed: ${passed}ms)`,
        )
      }
    }
  }
}

module.exports = TheQueue
