/**
 * Scope to hold array
 * @memberof module:@the-/scope.scopes
 * @class ArrayScope
 * @augments module:@the-/scope.scopes.Scope
 */
'use strict'

const Scope = require('./Scope')

/** @lends module:@the-/scope.scopes.ArrayScope */
class ArrayScope extends Scope {
  static get initialState() {
    return []
  }

  static get reducerFactories() {
    return {
      /**
       * Concat values
       * @function module:@the-/scope.scopes.ArrayScope#concat
       * @param {*} values - Valeus to concat
       */
      concat(...values) {
        return (state) => [].concat(state).concat(values)
      },
      init() {
        return () => ArrayScope.initialState
      },
      /**
       * Pop entry
       * @function module:@the-/scope.scopes.ArrayScope#pop
       */
      pop() {
        return (state) => state.slice(0, state.length - 1)
      },
      /**
       * Push entry
       * @function module:@the-/scope.scopes.ArrayScope#push
       * @param {*} entry
       */
      push(entry) {
        return (state) => [...state, entry]
      },
      /**
       * Reset state with values
       * @function module:@the-/scope.scopes.ArrayScope#reset
       * @param {Array} values - Values to override
       */
      reset(values) {
        return () => [...values]
      },
      /**
       * Set entry at index
       * @function module:@the-/scope.scopes.ArrayScope#set
       * @param {number} index - Array index
       * @param {*} entry - Value to set
       */
      set(index, entry) {
        const args = [...arguments]
        const isResetting = args.length === 1 && Array.isArray(args[0])
        return (state) => {
          return isResetting
            ? args[0]
            : [...state.slice(0, index), entry, ...state.slice(index + 1)]
        }
      },
      /**
       * Shift entry
       * @function module:@the-/scope.scopes.ArrayScope#shift
       */
      shift() {
        return (state) => state.slice(1)
      },
      /**
       * Unshift entry
       * @function module:@the-/scope.scopes.ArrayScope#unshift
       * @param {*} entry - Value to unshift
       */
      unshift(entry) {
        return (state) => [entry, ...state]
      },
    }
  }

  /** @property {number} */
  get length() {
    return this.state.length
  }
}

module.exports = ArrayScope
