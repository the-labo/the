/**
 * Check touch supported
 * @function canTouch
 * @returns {Boolean}
 */
'use strict'

/** @lends canTouch */
function canTouch() {
  if (typeof document === 'undefined') {
    return false
  }
  if (typeof window === 'undefined') {
    return false
  }
  const documentElement = !!document && document.documentElement
  if (!documentElement) {
    return false
  }
  return (
    'ontouchstart' in documentElement ||
    'ontouchstart' in window ||
    (window.DocumentTouch && document instanceof window.DocumentTouch) ||
    window.navigator.maxTouchPoints > 0 ||
    window.navigator.msMaxTouchPoints > 0
  )
}

module.exports = canTouch
