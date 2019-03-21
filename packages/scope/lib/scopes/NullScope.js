/**
 * Scope to hold null
 * @augments Scope
 * @class NullScope
 */
'use strict'

const Scope = require('./Scope')

/** @lends NullScope */
class NullScope extends Scope {
  static get initialState() {
    return null
  }

  static get reducerFactories() {
    return {
      init() {
        return () => NullScope.initialState
      },
    }
  }
}

module.exports = NullScope
