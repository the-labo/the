'use strict'

const { get } = require('@the-/window')

/**
 * Create Style element
 * @memberof module:@the-/entrypoint.helpers
 * @function createStyleElement
 * @param cssString
 * @param [options={}]
 * @returns {HTMLElement}
 */
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
