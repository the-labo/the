'use strict'

const get = require('./get')
const debug = require('debug')('the:window:once')

/**
 * Handle event once on document
 * @memberof module:@the-/window
 * @function once
 * @param {function()} handler - Event handler
 * @param {string} event - Name of event
 * @returns {function()} cancel func
 */
function once(event, handler) {
  const document = get('window.document')
  if (!document) {
    return
  }

  const handlerWrap = (...args) => {
    debug('handle', event, [...args])
    handler(...args)
    debug('remove', event)
    document.removeEventListener(event, handlerWrap)
  }
  debug('add', event)
  document.addEventListener(event, handlerWrap)

  return () => document.removeEventListener(event, handlerWrap)
}

module.exports = once
