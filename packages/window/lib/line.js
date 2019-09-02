'use strict'

const debug = require('debug')
const get = require('./get')

/**
 * Handle toggle online/offline
 * @memberof module:@the-/window
 * @function line
 * @param {function()} handler - Event handler
 * @param {Object} [options={}] - Optional settings
 * @param {number} [options.delay=100] Delay for callback
 * @returns {*}
 */
function line(handler, options = {}) {
  const { delay = 100 } = options
  const window = get('window')
  if (!window) {
    return
  }

  const handlerWrap = (connected) => {
    debug('onLine', connected)
    clearTimeout(handlerWrap._handleCallTimer)
    handlerWrap._handleCallTimer = setTimeout(() => {
      handler(connected)
    }, delay)
  }
  window.addEventListener('offline', () => handlerWrap(false))
  window.addEventListener('online', () => handlerWrap(true))
  handlerWrap(get('navigator.onLine'))
}

module.exports = line
