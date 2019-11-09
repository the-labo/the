'use strict'

const { get } = require('bwindow')
const isMultiTouchEvent = require('./isMultiTouchEvent')

/**
 * Stop touch scrolling
 * @memberof module:@the-/util-ui
 * @function stopTouchScrolling
 * @param {Object} [options={}]
 * @returns {function()} Resume function
 */
function stopTouchScrolling(options = {}) {
  const { skipMultipleTouch = false } = options
  const document = get('document')
  const handleEvent = (e) => {
    const skip = skipMultipleTouch && isMultiTouchEvent(e)
    if (skip) {
      return
    }

    e.preventDefault()
  }
  const eventOptions = { passive: false }
  const event = 'touchmove'
  document.addEventListener(event, handleEvent, eventOptions)
  return () => {
    document.removeEventListener(event, handleEvent, eventOptions)
  }
}

module.exports = stopTouchScrolling
