'use strict'

/**
 * Is multi touch event
 * @memberof module:@the-/util-ui
 * @function isMultiTouchEvent
 * @param {Event} e
 * @returns {boolean}
 */
function isMultiTouchEvent(e) {
  if (!e) {
    return false
  }

  const { touches } = e
  if (!touches) {
    return false
  }

  return touches.length > 1
}

module.exports = isMultiTouchEvent
