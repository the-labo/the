/**
 * @memberOf module:@the-/scene
 * @class TheScene
 */
'use strict'

const asobj = require('asobj')
const { errorMix, goMix, subMix } = require('./mixins')

const { cleanup } = asobj

const TheSceneMixed = [errorMix, goMix, subMix].reduce(
  (Clazz, mix) => mix(Clazz),
  class Root {},
)

/** @lends module:@the-/scene.TheScene */
class TheScene extends TheSceneMixed {
  constructor(props = {}) {
    super()
    Object.assign(this, props)
    this.props = props
  }

  get defaults() {
    return {}
  }

  get sceneName() {
    return this.name || this.constructor.name
  }

  /**
   * Scene scope
   * @returns {*}
   */
  get scope() {
    return null
  }

  /** Alias for `this.subFor` */
  for(...args) {
    return this.subFor(...args)
  }

  /** Alias for `this.scope.get` */
  get(namepath, options = {}) {
    const { strict = false } = options
    this._assertScope()
    this._assertScopeNamepath(namepath)
    const result = this.scope.get(namepath)
    if (strict) {
      const isEmpty = typeof result === 'undefined' || result === null
      if (isEmpty) {
        throw new Error(`[${this.name}] ${namepath} is required`)
      }
    }
    return result
  }

  /**
   * Check if value exists
   * @param {string} namepath
   * @returns {boolean}
   */
  has(namepath) {
    this._assertScope()
    this._assertScopeNamepath(namepath)
    if (!this.scope.has(namepath)) {
      return false
    }
    const value = this.scope.get(namepath)
    const empty = typeof value === 'undefined' || value === null
    return !empty
  }

  /** Alias for `this.scope.init` */
  init(...names) {
    this._assertScope()
    this.scope.init(...names)
    const { defaults = {} } = this
    if (names.length > 0) {
      this.set(
        cleanup(
          Object.assign(
            {},
            ...names.map((name) => ({
              [name]: defaults[name],
            })),
          ),
        ),
      )
    } else {
      this.set(defaults)
    }
  }

  /** Alias for `this.scope.set` */
  set(...args) {
    this._assertScope()
    this.scope.set(...args)
  }

  _assertScope() {
    if (!this.scope) {
      throw new Error(`scope not found for ${this.sceneName}`)
    }
  }

  _assertScopeNamepath(namepath) {
    if (!this.scope.has) {
      // For legacy scope signature
      return
    }
    if (!this.scope.has(namepath)) {
      throw new Error(
        `"${namepath}" is not found in the scope of ${this.sceneName}`,
      )
    }
  }
}

module.exports = TheScene
