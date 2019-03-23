/**
 * @function subMix
 * @param {function} BaseClass
 * @returns {function} MixedClass
 */
'use strict'

/** @lends subMix */
function subMix(BaseClass) {
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
