'use strict'

/**
 * Scroll to DOM element
 * @memberof module:@the-/util-site
 * @function scrollToElement
 * @param {string|HTMLDOMElement} element - Element or it's selector
 */
const { get } = require('bwindow')

/** @lends module:@the-/util-site.scrollToElement */
function scrollToElement(element) {
  const document = get('document')
  if (!document) {
    return
  }
  if (typeof element === 'string') {
    element = document.querySelector(element)
  }
  if (!element) {
    return
  }
  const scrollY = get('window.scrollY')
  const { top } = element.getBoundingClientRect()
  document.body.scrollTop = top + scrollY
}

module.exports = scrollToElement
