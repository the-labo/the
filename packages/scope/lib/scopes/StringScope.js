'use strict'

/**
 * Scope to hold value
 * @memberof module:@the-/scope.scopes
 * @class StringScope
 * @augments module:@the-/scope.scopes.Scope
 */
const Scope = require('./Scope')

/** @lends module:@the-/scope.scopes.StringScope */
class StringScope extends Scope {
  static get initialState() {
    return null
  }

  static get reducerFactories() {
    return {
      /**
       * Delete property
       * @function module:@the-/scope.scopes.StringScope#del
       */
      del() {
        return () => null
      },
      init() {
        return () => StringScope.initialState
      },
      /**
       * Replace string
       * @function module:@the-/scope.scopes.StringScope#replace
       * @param {string|RegExp} from - Value replace from
       * @param {string} to - Value replace to
       */
      replace(from, to) {
        return (state) => String(state).replace(from, to)
      },
      /**
       * Set property
       * @function module:@the-/scope.scopes.StringScope#set
       * @param {*} value - Value to set
       */
      set(value) {
        return () => value
      },
    }
  }
}

module.exports = StringScope
