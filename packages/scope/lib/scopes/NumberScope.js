/**
 * Scope to hold number
 * @augments Scope
 * @class NumberScope
 */
'use strict'

const Scope = require('./Scope')

/** @lends NumberScope */
class NumberScope extends Scope {
  static get initialState() {
    return 0
  }

  static get reducerFactories() {
    return {
      /**
       * Decrement value
       * @function NumberScope#decrement
       * @param {number} [amount=1]
       */
      decrement(amount = 1) {
        return (state) => state - amount
      },
      /**
       * Increment value
       * @function NumberScope#increment
       * @param {number} [amount=1]
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
