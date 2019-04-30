/**
 * @memberOf module:@the-/metrics.counters
 * @abstract
 * @class Counter
 */
'use strict'

/** @lends module:@the-/metrics.counters.Counter */
class Counter {
  constructor(context = {}) {
    this.context = context
    this.count = 0
  }
}

module.exports = Counter
