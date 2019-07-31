'use strict'

/**
 * Controller action invocation
 * @memberof module:@the-/controller
 * @class Invocation
 * @property {TheCtrl} target - Invocation target instance
 * @property {string} action - Name of action
 * @property {Array} params - Invocation params
 * @property {?*} result - Invocation Result
 * @property {?Error} error - Invocation error
 */
/** @lends module:@the-/controller.Invocation */
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
