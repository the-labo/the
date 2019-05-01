/**
 * Scope to hold number
 * @memberOf module:@the-/scope.scopes
 * @class NumberScope
 * @augments module:@the-/scope.scopes.Scope
 */
'use strict'

const Scope = require('./Scope')

/** @lends module:@the-/scope.scopes.NumberScope */
class NumberScope extends Scope {
  static get initialState() {
    return 0
  }

  static get reducerFactories() {
    return {
      /**
       * Decrement value
       * @function NumberScope#decrement
       * @param {number} [amount=1] - Amount to decrement
       */
      decrement(amount = 1) {
        return (state) => state - amount
      },
      /**
       * Increment value
       * @function NumberScope#increment
       * @param {number} [amount=1] - Amount to increment
       */
      increment(amount = 1) {
        return (state) => state + amount
      },
      init() {
        return () => NumberScope.initialState
      },
      /**
       * Set number
       * @function NumberScope#set
       * @param {number} n
       */
      set(n) {
        return () => n
      },
    }
  }

  /**
   * Check the value is negative
   * @returns {boolean}
   */
  isNegative() {
    return this.state < 0
  }

  /**
   * Check the value is positive
   * @returns {boolean}
   */
  isPositive() {
    return this.state > 0
  }

  /**
   * Check the value is zero
   * @returns {boolean}
   */
  isZero() {
    return this.state === 0
  }
}

module.exports = NumberScope
