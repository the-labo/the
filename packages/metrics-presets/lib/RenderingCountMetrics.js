'use strict'
/**
 * Count metrics for component rendering
 * @memberof module:@the-/metrics-presets
 * @function RenderingCountMetrics
 * @param {Object} Components - Components to count
 * @param {Object} [options={}] - Optional settings
 */
const { TheMetrics } = require('@the-/metrics')

const hasSymbol = typeof Symbol === 'function' && !!Symbol.for
const REACT_LAZY_TYPE = hasSymbol ? Symbol.for('react.lazy') : 0xead4
const REACT_MEMO_TYPE = hasSymbol ? Symbol.for('react.memo') : 0xead3

/** @lends module:@the-/metrics-presets.RenderingCountMetrics */
async function RenderingCountMetrics(Components, options = {}) {
  const { interval = 30 * 1000, name = 'RenderingCountMetrics' } = options
  const metrics = new TheMetrics({ interval, name })

  for (const [name, Component] of Object.entries(Components)) {
    if (!Component) {
      continue
    }
    const isLazy = Component.$$typeof === REACT_LAZY_TYPE
    if (isLazy) {
      // TODO support lazy
      continue
    }
    const isMemo = Component.$$typeof === REACT_MEMO_TYPE
    if (isMemo) {
      metrics.bindObjectMethodCallCounter(`${name}()`, {
        methodName: 'type',
        object: Component,
      })
      continue
    }
    metrics.bindClassMethodCallCounter(`${name}#render()`, {
      class: Component,
      methodName: 'render',
    })
  }
  return metrics.start()
}

module.exports = RenderingCountMetrics
