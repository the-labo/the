/**
 * Count react rendering counts
 * @class MethodCallCounter
 * @augments Counter
 */
'use strict'

const Counter = require('./Counter')

/** @lends MethodCallCounter */
class MethodCallCounter extends Counter {
  constructor(context = {}) {
    super(context)
    this.inject()
  }

  inject() {
    const { class: class_, methodName, name } = this.context
    const method = class_.prototype && class_.prototype[methodName]
    if (!method) {
      console.warn(
        `[TheMetrics][${name}] method ${JSON.stringify(methodName)} not found`,
      )
      return
    }
    if (method.$$theMetricsInjected) {
      throw new Error(`[TheMetrics] already injected`)
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

module.exports = MethodCallCounter
