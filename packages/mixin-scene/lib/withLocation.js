/**
 * withLocation mixin
 * @memberOf module:@the-/mixin-scene
 * @function withLocation
 * @param {function} Class - Class to mix
 * @returns {function} Mixed class
 */
'use strict'

const asleep = require('asleep')
const { get } = require('bwindow')
const asClassMixin = require('./helpers/asClassMixin')
const injectProperties = require('./helpers/injectProperties')

/** @lends module:@the-/mixin-scene.withLocation */
const withLocation = asClassMixin((Class) => {
  injectProperties(Class, {
    /**
     * Change location to url
     * @param {string} href
     */
    changeLocationTo(href) {
      this.location.href = href
    },
    /**
     * Get location hash
     * @returns {*}
     */
    getLocationHash() {
      const { location } = this
      if (!location) {
        return null
      }
      return location.hash
    },
    location: {
      get() {
        return get('location')
      },
    },
    /**
     * Reload current location
     * @returns {Promise<undefined>}
     */
    async reloadLocation(options = {}) {
      const { timeout = 30 * 1000 } = options
      this.location.reload()
      await asleep(timeout) // Wait for reload
      throw new Error(`Failed to reload`)
    },
    /**
     * Set location hash
     * @param {string} hash - Location hash to set
     */
    setLocationHash(hash) {
      const { location } = this
      if (!location) {
        return
      }
      location.hash = hash
    },
  })
})

module.exports = withLocation
