'use strict'

const { create: theAssert } = require('@the-/assert')
const { unlessProduction } = require('@the-/check-env')

const assert = theAssert('the:scope')

/**
 * Abstract scope class
 * @memberof module:@the-/scope.scopes
 * @class Scope
 * @abstract
 * @param {string} name - Name of state
 * @param {Object} config - Scope config
 */
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
