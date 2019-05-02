/**
 * Mixins for metrics
 * @memberof module:@the-/server.mixins
 * @function metricsMix
 * @param {function} Class
 * @returns {function} Class
 */
'use strict'

/** @lends module:@the-/server.mixins.metricsMix */
function metricsMix(Class) {
  /**
   * @memberof module:@the-/server.mixins.metricsMix
   * @inner
   * @class MetricsMix
   */
  class MetricsMix extends Class {
    constructor() {
      super(...arguments)
      this.metrics = {
        controllerAttachCounts: {},
        controllerDetachCounts: {},
        invocationKeepCounts: {},
        invocationKeepStartCounts: {},
        invocationKeepStopCounts: {},
      }
    }

    addControllerAttachCountMetrics(controllerName, amount = 1) {
      return this.addMetrics('controllerAttachCounts', controllerName, amount)
    }

    addControllerDetachCountMetrics(controllerName, amount = 1) {
      return this.addMetrics('controllerDetachCounts', controllerName, amount)
    }

    addInvocationKeepCountMetrics(controllerName, amount = 1) {
      return this.addMetrics('invocationKeepCounts', controllerName, amount)
    }

    addKeepStartCountMetrics(controllerName, amount = 1) {
      return this.addMetrics(
        'invocationKeepStartCounts',
        controllerName,
        amount,
      )
    }

    addKeepStopCountMetrics(controllerName, amount = 1) {
      return this.addMetrics('invocationKeepStopCounts', controllerName, amount)
    }

    addMetrics(namespace, key, amount = 1) {
      if (!this.metrics[namespace]) {
        throw new Error(`[MetricsMix] Unknown namespace: ${namespace}`)
      }
      this.metrics[namespace][key] =
        (this.metrics[namespace][key] || 0) + amount
    }
  }

  return MetricsMix
}

module.exports = metricsMix
