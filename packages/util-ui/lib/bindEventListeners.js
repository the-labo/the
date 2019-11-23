'use strict'

function bindEventListeners(elm, handlers, opt) {
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
