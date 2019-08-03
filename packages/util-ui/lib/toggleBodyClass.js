'use strict'

/**
 * Toggle class on document body
 * @memberof module:@the-/util-ui
 * @function toggleBodyClass
 * @param {string} className - Class name to toggle
 * @param {boolean} [state=] - Enabled or not
 */
const { get } = require('bwindow')

/** @lends module:@the-/util-ui.toggleBodyClass */
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
