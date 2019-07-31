'use strict'

/**
 * @memberof module:@the-/metrics.counters
 * @abstract
 * @class Counter
 */
/** @lends module:@the-/metrics.counters.Counter */
class Counter {
  constructor(context = {}) {
    this.context = context
    this.count = 0
  }
}

module.exports = Counter
