/**
 * Scope to hold value
 * @augments Scope
 * @class ValueScope
 */
'use strict'

const Scope = require('./Scope')

/** @lends ValueScope */
class ValueScope extends Scope {
  static get initialState() {
    return null
  }

  static get reducerFactories() {
    return {
      /**
       * Delete property
       * @function ValueScope#del
       */
      del() {
        return () => null
      },
      init() {
        return () => ValueScope.initialState
      },
      /**
       * Set property
       * @function ValueScope#set
       * @param {*} value - Value to set
       */
      set(value) {
        return () => value
      },
    }
  }
}

module.exports = ValueScope
