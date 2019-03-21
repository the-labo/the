/**
 * Scope to hold value
 * @augments Scope
 * @class StringScope
 */
'use strict'

const Scope = require('./Scope')

/** @lends StringScope */
class StringScope extends Scope {
  static get initialState() {
    return null
  }

  static get reducerFactories() {
    return {
      /**
       * Delete property
       * @function StringScope#del
       */
      del() {
        return () => null
      },
      init() {
        return () => StringScope.initialState
      },
      /**
       * Replace string
       * @function StringScope#replace
       * @param {string|RegExp} from
       * @param {string} to
       */
      replace(from, to) {
        return (state) => String(state).replace(from, to)
      },
      /**
       * Set property
       * @function StringScope#set
       * @param {*} value - Value to set
       */
      set(value) {
        return () => value
      },
    }
  }
}

module.exports = StringScope
