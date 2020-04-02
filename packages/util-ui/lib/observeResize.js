'use strict'

const { get } = require('bwindow')

/**
 * @memberof module:@the-/util-ui
 * @function observeSize
 * @param {HTMLElement?} elm
 * @param {function(?Array): void} handler
 * @returns {function(): void} - Unobserve function
 */
function observeResize(elm, handler) {
  const ResizeObserver = get('ResizeObserver')
  if (!ResizeObserver) {
    return () => {}
  }

  if (!elm) {
    return () => {}
  }

  const resizeObserver = new ResizeObserver((entries) => {
    handler([...entries])
  })
  resizeObserver.observe(elm)
  return () => {
    resizeObserver.unobserve(elm)
    resizeObserver.disconnect()
  }
}

module.exports = observeResize
