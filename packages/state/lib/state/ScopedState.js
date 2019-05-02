/**
 * State works as scope
 * @memberof module:@the-/state.state
 * @class ScopedState
 * @augments module:@the-/state.state.State
 * @param {string} name - Name of scope
 */
'use strict'

const State = require('./State')
const NAME_SEPARATE_PATTERN = /\./

/** @lends module:@the-/state.state.ScopedState */
class ScopedState extends State {
  constructor(name, options = {}) {
    super()
    const { parent = null } = options
    this.name = name
    this.scopes = new Map()
    this.parent = parent
    this.$$init()
  }

  set $$state(values) {
    const { name, parent } = this
    parent.set({ [name]: values })
    this.publish()
  }

  get $$state() {
    const { name, parent } = this
    return parent.get(name)
  }

  $$init() {
    this.set({})
  }

  /**
   * Scope with name
   * @param {...string} names - Name of scope
   */
  scope(...names) {
    const [name, ...subNames] = names
    if (subNames.length > 0) {
      const scope = this.scope(name)
      return scope.scope(...subNames)
    }

    if (NAME_SEPARATE_PATTERN.test(name)) {
      return this.scope(...name.split(NAME_SEPARATE_PATTERN))
    }

    const known = this.scopes.get(name)
    if (known) {
      return known
    }
    const scope = new ScopedState(name, { parent: this })
    this.scopes.set(name, scope)
    return scope
  }
}

module.exports = ScopedState
