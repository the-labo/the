'use strict'

const get = require('./get')
const debug = require('debug')('the:window:rescue')

/**
 * Handle event rescue on document
 * @memberof module:@the-/window
 * @function rescue
 * @param {function()} handler - Event handler
 * @param {string} event - Name of event
 * @returns {*}
 */
function rescue(handler) {
  const window = get('window')
  if (!window) {
    return
  }

  window.addEventListener('unhandledrejection', handler)

  {
    const { onerror } = window
    window.onerror = function theErrorRescue(e) {
      debug('error', e)
      onerror && onerror(e)
      if (e.resolved) {
        return
      }

      handler(e)
    }
  }
}

module.exports = rescue
