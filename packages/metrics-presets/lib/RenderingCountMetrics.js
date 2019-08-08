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
  const { interval = 30000, name = 'RenderingCountMetrics' } = options
  const metrics = new TheMetrics({ interval, name })

  const bindComponent = (name, Component) => {
    if (!Component) {
      return
    }

    const isLazy = Component.$$typeof === REACT_LAZY_TYPE
    if (isLazy) {
      const { _ctor, _result } = Component
      if (_result) {
        bindComponent(name, _result)
      } else {
        Component._ctor = async (...args) => {
          const result = await _ctor(...args)
          if (result) {
            bindComponent(name, result.default || result)
          }

          return result
        }
      }

      return
    }

    const isMemo = Component.$$typeof === REACT_MEMO_TYPE
    if (isMemo) {
      metrics.bindObjectMethodCallCounter(`${name}()`, {
        methodName: 'type',
        object: Component,
      })
      return
    }

    const { prototype } = Component
    const isClassBase =
      !!prototype &&
      (prototype.isReactComponent || prototype.isPureReactComponent)
    if (isClassBase) {
      metrics.bindClassMethodCallCounter(`${name}#render()`, {
        class: Component,
        methodName: 'render',
      })
      return
    }

    const isFunctionBase = typeof Component === 'function'
    if (isFunctionBase) {
      // TODO
    }
  }

  for (const [name, Component] of Object.entries(Components)) {
    bindComponent(name, Component)
  }
  return metrics.start()
}

module.exports = RenderingCountMetrics
