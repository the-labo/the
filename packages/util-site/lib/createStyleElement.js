'use strict'
/**
 * @memberof module:@the-/util-site
 * @function createStyleElement
 * @param {string} css - CSS String
 * @param {object} [options={}] - Optional settings
 */
const { get } = require('bwindow')

/** @lends module:@the-/util-site.createStyleElement */
function createStyleElement(css, options = {}) {
  const {
    className = 'the-dynamic-style',
    document = get('document'),
  } = options
  const style = document.createElement('style')
  style.type = 'text/css'
  const cssNode = document.createTextNode(css)
  style.appendChild(cssNode)
  style.classList.add(className)
  return style
}

module.exports = createStyleElement
