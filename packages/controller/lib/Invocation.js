/**
 * Controller action invocation
 * @class Invocation
 * @property {TheCtrl} target - Invocation target instance
 * @property {string} action - Name of action
 * @property {Array} params - Invocation params
 * @property {?*} result - Invocation Result
 * @property {?Error} error - Invocation error
 */
'use strict'

/** @lends Invocation */
class Invocation {
  constructor(values = {}) {
    const { action, at = new Date(), error, params, result, target } = values
    Object.assign(this, {
      action,
      at,
      error,
      params,
      result,
      target,
    })
  }
}

module.exports = Invocation
