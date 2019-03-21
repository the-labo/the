/**
 * Scope to hold object
 * @augments Scope
 * @class ObjectScope
 */
'use strict'

const Scope = require('./Scope')

/** @lends ObjectScope */
class ObjectScope extends Scope {
  static get initialState() {
    return {}
  }

  static get reducerFactories() {
    return {
      /**
       * Delete property
       * @function ObjectScope#del
       * @param {...string} names - Name to delete
       */
      del(...names) {
        return (state) => {
          let needsToDelete = names.some((name) => state.hasOwnProperty(name))
          if (!needsToDelete) {
            return state
          }
          return Object.keys(state)
            .filter((filtering) => !names.includes(filtering))
            .reduce(
              (reduced, name) =>
                Object.assign(reduced, {
                  [name]: state[name],
                }),
              {},
            )
        }
      },
      /**
       * Delete all
       * @function ObjectScope#drop
       */
      drop() {
        return () => ({})
      },
      init() {
        return () => ObjectScope.initialState
      },
      /**
       * Reset to values
       * @param {Object} values
       */
      reset(values = {}) {
        return (state) => {
          const needsSet = Object.keys(values || {}).some(
            (name) => values[name] !== state[name],
          )
          if (!needsSet) {
            return state
          }
          return { ...values }
        }
      },
      /**
       * Set property
       * @function ObjectScope#set
       * @param {string} name - name to set
       * @param {*} value - Value to set
       */
      set(name, value) {
        const byObject =
          arguments.length === 1 && typeof arguments[0] === 'object'
        const values = byObject
          ? arguments[0]
          : {
              [name]: value,
            }
        return (state) => {
          const needsSet = Object.keys(values || {}).some(
            (name) => values[name] !== state[name],
          )
          if (!needsSet) {
            return state
          }
          return Object.assign({}, state, values)
        }
      },
    }
  }

  /** Get a value for name */
  get(name) {
    return this.state[name]
  }

  /** Check value exists for name */
  has(name) {
    return this.state.hasOwnProperty(name)
  }
}

module.exports = ObjectScope
