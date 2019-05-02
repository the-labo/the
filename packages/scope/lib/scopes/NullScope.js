/**
 * Scope to hold null
 * @memberof module:@the-/scope.scopes
 * @class NullScope
 * @augments module:@the-/scope.scopes.Scope
 */
'use strict'

const Scope = require('./Scope')

/** @lends module:@the-/scope.scopes.NullScope */
class NullScope extends Scope {
  static get initialState() {
    return null
  }

  static get reducerFactories() {
    return {
      init() {
        return () => NullScope.initialState
      },
    }
  }
}

module.exports = NullScope
