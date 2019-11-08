'use strict'

const { get } = require('bwindow')

/**
 * Stop touch scrolling
 * @memberof module:@the-/util-ui
 * @function stopTouchScrolling
 * @returns {function()} Resume function
 */
function stopTouchScrolling() {
  const document = get('document')
  const preventEvent = (e) => e.preventDefault()
  const eventOptions = { passive: false }
  document.addEventListener('touchmove', preventEvent, eventOptions)
  return () => {
    document.removeEventListener('touchmove', preventEvent, eventOptions)
  }
}

module.exports = stopTouchScrolling
