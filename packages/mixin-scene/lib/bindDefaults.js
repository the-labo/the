'use strict'

const asClassMixin = require('./helpers/asClassMixin')
const injectProperties = require('./helpers/injectProperties')

/**
 * For bindDefaults
 * @memberof module:@the-/mixin-scene
 * @function bindDefaults
 * @param values
 * @returns {function()} method annotation function
 */
function bindDefaults(values) {
  return asClassMixin((Class) => {
    const {
      prototype: { defaults: super_ },
    } = Class
    injectProperties(Class, {
      defaults: {
        configurable: true,
        get() {
          const normalized =
            typeof values === 'function' ? values(this) : values
          return {
            ...(super_ || {}),
            ...normalized,
          }
        },
      },
    })
  })
}

module.exports = bindDefaults
