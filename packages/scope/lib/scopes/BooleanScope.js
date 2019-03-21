/**
 * Scope to hold boolean
 * @augments Scope
 * @class BooleanScope
 */
'use strict'

const Scope = require('./Scope')

/** @lends BooleanScope */
class BooleanScope extends Scope {
  static get initialState() {
    return false
  }

  static get reducerFactories() {
    return {
      init() {
        return () => BooleanScope.initialState
      },
      /**
       * Toggle value
       * @function BooleanScope#toggle
       * @param {?Boolean} [value]
       */
      toggle(value) {
        return (state) => (typeof value === 'undefined' ? !state : value)
      },
    }
  }

  // noinspection ReservedWordAsName
  /**
   * Toggle to false
   */
  false() {
    return this.toggle(false)
  }

  /**
   * Alias of toggle
   */
  set(value) {
    return this.toggle(value)
  }

  // noinspection ReservedWordAsName
  /**
   * Toggle to true
   */
  true() {
    return this.toggle(true)
  }
}

module.exports = BooleanScope
