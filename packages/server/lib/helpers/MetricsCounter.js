/**
 * MetricsC Counter
 * @memberof module:@the-/server.helpers
 * @function MetricsCounter
 */
'use strict'

/** @lends module:@the-/server.helpers.MetricsCounter */
function MetricsCounter() {
  const counts = {
    controllerAttachCounts: {},
    controllerDetachCounts: {},
    invocationKeepCounts: {},
    invocationKeepStartCounts: {},
    invocationKeepStopCounts: {},
  }

  /**
   * @memberof module:@the-/server.helpers.metricsMix
   * @inner
   * @namespace metricsCounter
   */
  const metricsCounter = {
    counts,
    add(namespace, key, amount = 1) {
      if (!counts[namespace]) {
        throw new Error(`[MetricsMix] Unknown namespace: ${namespace}`)
      }

      counts[namespace][key] = (counts[namespace][key] || 0) + amount
    },
    addControllerAttachCount(controllerName, amount = 1) {
      return metricsCounter.add(
        'controllerAttachCounts',
        controllerName,
        amount,
      )
    },
    addControllerDetachCount(controllerName, amount = 1) {
      return metricsCounter.add(
        'controllerDetachCounts',
        controllerName,
        amount,
      )
    },
    addInvocationKeepCount(controllerName, amount = 1) {
      return metricsCounter.add('invocationKeepCounts', controllerName, amount)
    },
    addKeepStartCount(controllerName, amount = 1) {
      return metricsCounter.add(
        'invocationKeepStartCounts',
        controllerName,
        amount,
      )
    },
    addKeepStopCount(controllerName, amount = 1) {
      return metricsCounter.add(
        'invocationKeepStopCounts',
        controllerName,
        amount,
      )
    },
  }

  Object.freeze(metricsCounter)

  return metricsCounter
}

module.exports = MetricsCounter
