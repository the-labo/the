'use strict'
/**
 * Abstract scope class
 * @memberof module:@the-/scope.scopes
 * @abstract
 * @class Scope
 * @param {string} name - Name of state
 * @param {Object} config - Scope config
 */
const { create: theAssert } = require('@the-/assert')
const { unlessProduction } = require('@the-/check')

const assert = theAssert('the:scope')

/** @lends module:@the-/scope.scopes.Scope */
class Scope {
  /** @deprecated */
  static withDefault(value) {
    class ScopeWithDefault extends this {
      static get initialState() {
        return value
      }
    }

    return ScopeWithDefault
  }

  constructor(name) {
    unlessProduction(() => {
      assert(name, '[Scope] name is required!')
    })
    this.name = name
    this._state = undefined
  }

  $$setState(state) {
    this._state = state
  }

  get state() {
    return this._state
  }
}

module.exports = Scope
