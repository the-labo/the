'use strict'

export function addEventListenersToElm(elm, listeners, opt) {
  for (const [ev, listener] of Object.entries(listeners)) {
    elm.addEventListener(ev, listener, opt)
  }
}

export function removeEventListenersFromElm(elm, listeners, opt) {
  for (const [ev, listener] of Object.entries(listeners)) {
    elm.removeEventListener(ev, listener, opt)
  }
}
