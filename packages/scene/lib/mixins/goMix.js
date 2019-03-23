/**
 * @function goMix
 * @param {function} BaseClass
 * @returns {function} MixedClass
 */
'use strict'

const { get } = require('bwindow')
const { formatUrl } = require('@the-/url')

/** @lends goMix */
function goMix(BaseClass) {
  class GoMixed extends BaseClass {
    goTo(href, params = {}) {
      href = formatUrl(href, params)
      const { history } = this
      if (history) {
        history.push(href)
        return
      }
      const location = get('location')
      if (location) {
        location.href = href
        return
      }
      console.warn(`Failed to go to ${href}`)
    }

    goToTop() {
      this.goTo('/')
    }
  }

  return GoMixed
}

module.exports = goMix
