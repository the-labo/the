/**
 * withSort mixin
 * @memberof module:@the-/mixin-scene
 * @function withSort
 * @param {function()} Class - Class to mix
 * @returns {function()} Mixed class
 */
/**
 * @memberof module:@the-/mixin-scene.withSort
 * @inner
 * @class WithSortMixed
 */
'use strict'

const asClassMixin = require('./helpers/asClassMixin')
const injectProperties = require('./helpers/injectProperties')

const firstOfArray = (v) => v && (Array.isArray(v) ? v[0] : v)
const normalizeSort = (key) => {
  key = firstOfArray(key)
  if (!key) {
    return ''
  }
  return key.replace(/^-/, '') || ''
}

/** @lends module:@the-/mixin-scene.withSort */
const withSort = asClassMixin((Class) => {
  injectProperties(
    Class,
    /** @lends module:@the-/mixin-scene.withSort~WithSortMixed */
    {
      getSort() {
        return this.get('sort')
      },
      setSort(name) {
        const current = this.get('sort')
        if (normalizeSort(current) === normalizeSort(name)) {
          name = /^-/.test(current) ? normalizeSort(current) : `-${current}`
        }
        this.set({ sort: name })
      },
    },
  )
})

module.exports = withSort
