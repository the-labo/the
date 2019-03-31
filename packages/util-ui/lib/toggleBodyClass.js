/**
 * Toggle class on document body
 * @function toggleBodyClass
 * @param {string} className - Class name to toggle
 * @param {boolean} [state=] - Enabled or not
 */
'use strict'

const { get } = require('bwindow')

function toggleBodyClass(className, enabled) {
  const body = get('document.body')
  if (!body) {
    return
  }
  if (typeof enabled === 'undefined') {
    enabled = !body.classList.contains(className)
  }
  if (enabled) {
    body.classList.add(className)
  } else {
    body.classList.remove(className)
  }
}

module.exports = toggleBodyClass
