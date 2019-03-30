/**
 * For bindDefaults
 * @function bindDefaults
 * @returns {function} method annotation function
 */
'use strict'

const asClassMixin = require('./helpers/asClassMixin')
const injectProperties = require('./helpers/injectProperties')

/** @lends bindDefaults */
function bindDefaults(values) {
  return asClassMixin((Class) => {
    const super_ = Class.prototype.defaults
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
