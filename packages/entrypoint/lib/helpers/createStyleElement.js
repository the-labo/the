'use strict'
/**
 * Create Style element
 * @memberof module:@the-/entrypoint.helpers
 * @function createStyleElement
 * @returns {HTMLElement}
 */
const { get } = require('@the-/window')

/** @lends module:@the-/entrypoint.helpers.createStyleElement */
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
