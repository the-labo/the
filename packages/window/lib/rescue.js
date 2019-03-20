/**
 * Handle event rescue on document
 * @function rescue
 * @param {string} event - Name of event
 * @param {function} handler - Event handler
 */
'use strict'

const get = require('./get')
const debug = require('debug')('the:window:rescue')

/** @lends rescue */
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
