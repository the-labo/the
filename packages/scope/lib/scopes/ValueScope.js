/**
 * Scope to hold value
 * @memberof module:@the-/scope.scopes
 * @class ValueScope
 * @augments module:@the-/scope.scopes.Scope
 */
'use strict'

const Scope = require('./Scope')

/** @lends module:@the-/scope.scopes.ValueScope */
class ValueScope extends Scope {
  static get initialState() {
    return null
  }

  static get reducerFactories() {
    return {
      /**
       * Delete property
       * @function module:@the-/scope.scopes.ValueScope#del
       */
      del() {
        return () => null
      },
      init() {
        return () => ValueScope.initialState
      },
      /**
       * Set property
       * @function module:@the-/scope.scopes.ValueScope#set
       * @param {*} value - Value to set
       */
      set(value) {
        return () => value
      },
    }
  }
}

module.exports = ValueScope
