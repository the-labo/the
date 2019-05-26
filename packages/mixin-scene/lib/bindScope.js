'use strict'
/**
 * For bindScope
 * @memberof module:@the-/mixin-scene
 * @function bindScope
 * @returns {function()} Class annotation function
 */
const { unlessProduction } = require('@the-/check')
const asClassMixin = require('./helpers/asClassMixin')
const injectProperties = require('./helpers/injectProperties')

/** @lends module:@the-/mixin-scene.bindScope */
function bindScope(name) {
  unlessProduction(() => {
    if (!name) {
      throw new Error('[bindScope] name is required')
    }
  })
  return asClassMixin((Class) => {
    injectProperties(Class, {
      scope: {
        configurable: false,
        get() {
          const nameComponents = name.split('.')
          let { store: scope } = this
          while (nameComponents.length > 0) {
            scope = scope[nameComponents.shift()]
            unlessProduction(() => {
              if (!scope) {
                throw new Error(`Scope "${name}" is not found in the store`)
              }
            })
          }
          return scope
        },
      },
    })
  })
}

module.exports = bindScope
