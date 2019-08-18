'use strict'

const { unlessProduction } = require('@the-/check')
const Scope = require('./Scope')

/**
 * Scope to other scopes
 * @memberof module:@the-/scope.scopes
 * @class ScopeScope
 * @augments module:@the-/scope.scopes.Scope
 */
class ScopeScope extends Scope {
  static get initialState() {
    return null
  }

  static get reducerFactories() {
    return {}
  }

  /**
   * Get state value from name path string
   * @param {string} namepath - Name path of state
   * @returns {*} Stored state
   */
  get(namepath) {
    return this.of(namepath).state
  }

  /**
   * Check if scope exists
   * @param {string} namepath - Name path of state
   * @returns {boolean}
   */
  has(namepath) {
    try {
      return !!this.of(namepath)
    } catch (e) {
      return false
    }
  }

  /**
   * Init scope values
   * @param {...string} names - Names to init
   */
  init(...names) {
    const { scopes } = this.$$store || {}
    const namepaths =
      names.length > 0
        ? names.map((name) => [this.name, name].join('.'))
        : Object.keys(scopes)
    const targetScopes = namepaths
      .filter(
        (namepath) =>
          namepath !== this.name && namepath.indexOf(this.name) === 0,
      )
      .map((namepath) => scopes[namepath])
    for (const scope of targetScopes) {
      scope.init && scope.init()
    }
  }

  /**
   * Sub scope of namepath
   * @param {string} namepath - Name path of state
   * @returns {ScopeScope}
   */
  of(namepath) {
    if (!namepath) {
      throw new Error(`[${this.name}] namepath is required`)
    }

    const names = namepath.split('.')
    let scope = this
    const resolvedNames = []
    while (names.length > 0) {
      const name = names.shift()
      resolvedNames.push(name)
      scope = scope[name]
      if (!scope) {
        const missing = resolvedNames.join('.')
        throw new Error(
          `[${this.name}] Unknown scope: "${missing}" for ${this.name}`,
        )
      }
    }
    return scope
  }

  /**
   * Set state with name path
   * @param {string} namepath - Name path of state
   * @param {*} value - Value to set
   */
  set(namepath, value) {
    const byObj = arguments.length === 1 && typeof arguments[0] === 'object'
    if (byObj) {
      for (const [name, value] of Object.entries(arguments[0] || {})) {
        this.set(name, value)
      }
      return
    }

    unlessProduction(() => {
      if (typeof value === 'undefined') {
        console.warn(
          `[${this.name}] Value can not be undefined for namepath "${namepath}". Use \`null\` to clear value`,
        )
        value = null
      }
    })
    const skip = this.get(namepath) === value
    if (skip) {
      return
    }

    this.of(namepath).set(value)
  }
}

module.exports = ScopeScope
