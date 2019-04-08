/**
 * Count metrics for component rendering
 * @function RenderingCountMetrics
 * @param {Object} Components - Components to count
 * @param {Object} [options={}] - Optional settings
 */
'use strict'

const { TheMetrics } = require('@the-/metrics')

const hasSymbol = typeof Symbol === 'function' && !!Symbol.for
const REACT_LAZY_TYPE = hasSymbol ? Symbol.for('react.lazy') : 0xead4

/** @lends RenderingCountMetrics */
async function RenderingCountMetrics(Components, options = {}) {
  const { interval = 30 * 1000, name = 'RenderingCountMetrics' } = options
  const metrics = new TheMetrics({ interval, name })

  for (const [name, Component] of Object.entries(Components)) {
    const isClass = !!Component
    if (!isClass) {
      continue
    }
    const isLazy = Component.$$typeof === REACT_LAZY_TYPE
    if (isLazy) {
      // TODO support lazy
      continue
    }
    metrics.bindMethodCallCounter(`${name}#render()`, {
      class: Component,
      methodName: 'render',
    })
  }
  return metrics.start()
}

module.exports = RenderingCountMetrics
