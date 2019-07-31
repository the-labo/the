'use strict'

/**
 * Count react rendering counts
 * @memberof module:@the-/metrics.counters
 * @class ClassMethodCallCounter
 * @augments Counter
 */
const Counter = require('./Counter')

/** @lends module:@the-/metrics.counters.ClassMethodCallCounter */
class ClassMethodCallCounter extends Counter {
  constructor(context = {}) {
    super(context)
    this.inject()
  }

  inject() {
    const {
      context: { class: class_, methodName, name },
    } = this
    const method = class_.prototype && class_.prototype[methodName]
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
    class_.prototype[methodName] = methodCallCounterWrap
  }
}

module.exports = ClassMethodCallCounter
