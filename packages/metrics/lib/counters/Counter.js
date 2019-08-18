'use strict'

/**
 * @memberof module:@the-/metrics.counters
 * @class Counter
 * @abstract
 */
class Counter {
  constructor(context = {}) {
    this.context = context
    this.count = 0
  }
}

module.exports = Counter
