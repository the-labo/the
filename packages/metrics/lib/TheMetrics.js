'use strict'
/**
 * @memberof module:@the-/metrics
 * @class TheMetrics
 * @param {Object} [options={}] - Optional settings
 */
const { MethodCallCounter } = require('./counters')

/** @lends module:@the-/metrics.TheMetrics */
class TheMetrics {
  constructor(options = {}) {
    const { interval = 30 * 1000, name = 'TheMetrics' } = options
    this.name = name
    this.counters = {}
    this.at = new Date()
    this.interval = interval
  }

  get data() {
    const data = {}
    for (const [name, counter] of Object.entries(this.counters)) {
      if (counter) {
        data[name] = counter.count
      }
    }
    return data
  }

  bindCounter(name, counter) {
    if (this.counters[name]) {
      throw new Error(`[TheMetrics] "${name}" is already bound`)
    }
    this.counters[name] = counter
  }

  /**
   * Bind method call counter
   * @param {string} name - Name of counter
   * @param {Object} config
   */
  bindMethodCallCounter(name, config = {}) {
    const { class: class_, methodName } = config
    this.bindCounter(
      name,
      new MethodCallCounter({
        class: class_,
        methodName,
        name,
      }),
    )
  }

  /**
   * Flush metrics data
   */
  flush() {
    const now = new Date()
    const took = now - this.at
    const entries = Object.entries(this.data)
      .filter(([, value]) => value !== 0)
      .sort((a, b) => b[1] - a[1])
    console.groupCollapsed(
      `[${this.name}] ${entries.length} metrics flushed for ${took}ms`,
    )
    for (const [name, value] of entries) {
      console.log(name, value)
    }
    console.groupEnd()
    this.at = now
  }

  /**
   * Start measuring
   */
  start() {
    const timer = setInterval(() => {
      this.flush()
    }, this.interval)
    console.groupCollapsed(`[${this.name}] Metrics started`)
    console.log('name', this.name)
    console.log('interval', this.interval)
    console.log('counters', Object.keys(this.counters))
    console.groupEnd()
    const stop = () => {
      clearTimeout(timer)
    }
    return Object.assign(stop, { stop })
  }
}

module.exports = TheMetrics
