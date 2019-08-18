'use strict'

const { get } = require('bwindow')

/**
 * @memberof module:@the-/util-site
 * @function createStyleElement
 * @param {object} [options={}] - Optional settings
 * @param {string} css - CSS String
 * @returns {*}
 */
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
