'use strict'

/**
 * @memberof module:@the-/jitter
 * @class TheJitter
 * @param {Object} [options={}] - Optional settings
 */
const asleep = require('asleep')

const COUNT = Symbol('count')

const debug = require('debug')('the:jitter')

/** @lends module:@the-/jitter.TheJitter */
class TheJitter {
  constructor(options = {}) {
    const { max = 100, maxInterval = 1000 } = options
    this.maxCount = max
    this.maxInterval = maxInterval
    this[COUNT] = 0
  }

  get count() {
    return this[COUNT]
  }

  /**
   * Decrement count
   */
  decrementCount(amount = 1) {
    this.incrementCount(amount * -1)
  }

  durationToWait() {
    const { count } = this
    if (count <= 0) {
      return 0
    }

    return Math.floor(Math.random() * count * this.maxInterval)
  }

  /**
   * Increment count
   */
  incrementCount(amount = 1) {
    this[COUNT] += amount
  }

  invalidate() {
    const exceeded = this.count >= this.maxCount
    if (exceeded) {
      debug('Exceeded', { actual: this.count, max: this.maxCount })
      this.resetCount()
    }

    if (this.count < 0) {
      debug('Lower than zero')
      this.resetCount()
    }
  }

  /**
   * Reset count
   */
  resetCount() {
    this[COUNT] = 0
  }

  /**
   * Handle action
   * @param {Function} action
   * @returns {Promise<undefined>}
   */
  async handle(action) {
    this.invalidate()
    await this.wait()
    this.incrementCount()
    try {
      return await action()
    } finally {
      this.decrementCount()
    }
  }

  /**
   * Wait for delay
   * @returns {Promise}
   */
  async wait() {
    const duration = this.durationToWait()
    if (!duration) {
      return
    }

    debug(`wait for ${duration}ms (${this.count} call exists)`)
    await asleep(duration)
  }
}

module.exports = TheJitter
