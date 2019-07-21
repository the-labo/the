'use strict'
/**
 * Count react rendering counts
 * @memberof module:@the-/metrics.counters
 * @class ObjectMethodCallCounter
 * @augments Counter
 */
const Counter = require('./Counter')

/** @lends module:@the-/metrics.counters.ObjectMethodCallCounter */
class ObjectMethodCallCounter extends Counter {
  constructor(context = {}) {
    super(context)
    this.inject()
  }

  inject() {
    const {
      context: { methodName, name, object: object_ },
    } = this
    const method = object_[methodName]
    if (!method) {
      console.warn(
        `[TheMetrics][${name}] method ${JSON.stringify(methodName)} not found`,
      )
      return
    }
    if (method.$$theMetricsInjected) {
      throw new Error('[TheMetrics] already injected')
    }
    const counter = this

    function methodCallCounterWrap() {
      counter.count++
      return method.call(this, ...arguments)
    }

    methodCallCounterWrap.$$theMetricsInjected = true
    object_[methodName] = methodCallCounterWrap
  }
}

module.exports = ObjectMethodCallCounter
