/**
 * Scope to hold array
 * @augments Scope
 * @class ArrayScope
 */
'use strict'

const Scope = require('./Scope')

/** @lends ArrayScope */
class ArrayScope extends Scope {
  static get initialState() {
    return []
  }

  static get reducerFactories() {
    return {
      /**
       * Concat values
       * @function ArrayScope#concat
       * @param {*} values
       */
      concat(...values) {
        return (state) => [].concat(state).concat(values)
      },
      init() {
        return () => ArrayScope.initialState
      },
      /**
       * Pop entry
       * @function ArrayScope#pop
       */
      pop() {
        return (state) => state.slice(0, state.length - 1)
      },
      /**
       * Push entry
       * @function ArrayScope#push
       * @param {*} entry
       */
      push(entry) {
        return (state) => [...state, entry]
      },
      /**
       * Reset state with values
       * @function ArrayScope#reset
       * @param {Array} values
       */
      reset(values) {
        return () => [...values]
      },
      /**
       * Set entry at index
       * @param {number} index
       * @param {*} entry
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
       * @function ArrayScope#shift
       */
      shift() {
        return (state) => state.slice(1)
      },
      /**
       * Unshift entry
       * @function ArrayScope#unshift
       * @param {*} entry
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
