'use strict'

const get = require('./get')

/**
 * Shows in full screen
 * @memberof module:@the-/window
 * @function full
 * @param {Object} [options={}] - Optional setting
 * @returns {function()} Close function
 */
function full(options = {}) {
  const { elm = get('document.body') } = options

  if (!elm.requestFullscreen) {
    return
  }
  elm.requestFullscreen()
  return () => {
    const active = get('document.fullscreenElement') === elm
    if (active) {
      full.exit()
    }
  }
}

full.exit = function exitFull() {
  const exitFullscreen = get('document.exitFullscreen')
  if (!exitFullscreen) {
    return
  }
  exitFullscreen()
}

module.exports = full
