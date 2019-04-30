/**
 * @function subMix
 * @memberOf module:@the-/scene.mixins
 * @param {function} BaseClass
 * @returns {function} MixedClass
 */
'use strict'

/** @lends module:@the-/scene.mixins.subMix */
function subMix(BaseClass) {
  /**
   * @memberOf module:@the-/scene.mixins.subMix
   * @inner
   */
  class SubMixed extends BaseClass {
    constructor(...args) {
      super(...args)
      this.subs = {}
    }

    /**
     * Get sub scene with scope for namepath
     * @param {string} namepath - Namepath
     * @returns {*}
     */
    subFor(namepath) {
      const scope = this.scope.of(namepath)
      const sub = this.subs[namepath]
      if (sub) {
        return sub
      }

      class SubScene extends this.constructor {
        get scope() {
          return scope
        }
      }

      this.subs[namepath] = new SubScene(this.props)
    }
  }

  return SubMixed
}

module.exports = subMix
