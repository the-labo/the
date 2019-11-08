'use strict'

const { get } = require('bwindow')

/**
 * Toggle class on document body
 * @memberof module:@the-/util-ui
 * @function toggleBodyClass
 * @param {boolean} [enabled=] - Enabled or not
 * @param {string} className - Class name to toggle
 * @returns {*}
 */
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
