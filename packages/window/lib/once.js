'use strict'

/**
 * Handle event once on document
 * @memberof module:@the-/window
 * @function once
 * @param {string} event - Name of event
 * @param {function()} handler - Event handler
 */
const get = require('./get')
const debug = require('debug')('the:window:once')

/** @lends module:@the-/window.once */
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
}

module.exports = once
