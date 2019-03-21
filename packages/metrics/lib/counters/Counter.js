/**
 * @abstract
 * @class Counter
 */
'use strict'

class Counter {
  constructor(context = {}) {
    this.context = context
    this.count = 0
  }
}

module.exports = Counter
