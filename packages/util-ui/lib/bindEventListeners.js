'use strict'

/**
 * @memberof module:@the-/util-ui
 * @function bindEventListeners
 * @param elm
 * @param {Object} handlers
 * @param {Object} [opt] - Options settings
 * @returns {function()} - Unbind function
 */
function bindEventListeners(elm, handlers, opt) {
  if (!elm) {
    console.warn('[@the-/util-ui][bindEventListeners] Elm missing')
    return () => {}
  }
  for (const [name, handler] of Object.entries(handlers)) {
    elm.addEventListener(name, handler, opt)
  }
  return () => {
    for (const [name, handler] of Object.entries(handlers)) {
      elm.removeEventListener(name, handler, opt)
    }
  }
}

module.exports = bindEventListeners
