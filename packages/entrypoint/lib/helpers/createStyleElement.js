/**
 * Create Style element
 * @function createStyleElement
 * @returns {HTMLElement}
 */
'use strict'

const { get } = require('@the-/window')

/** @lends createStyleElement */
function createStyleElement(cssString, options = {}) {
  const { className } = options
  const document = get('document')
  const style = document.createElement('style')
  style.classList.add(className)
  const rule = document.createTextNode(cssString)
  style.appendChild(rule)
  return style
}

module.exports = createStyleElement
