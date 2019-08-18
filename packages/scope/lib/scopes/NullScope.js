'use strict'

const Scope = require('./Scope')

/**
 * Scope to hold null
 * @memberof module:@the-/scope.scopes
 * @class NullScope
 * @augments module:@the-/scope.scopes.Scope
 */
class NullScope extends Scope {
  static get initialState() {
    return null
  }

  static get reducerFactories() {
    return {
      /**
       * @function module:@the-/scope.scopes.NullScope#init
       */
      init() {
        return () => NullScope.initialState
      },
    }
  }
}

module.exports = NullScope
