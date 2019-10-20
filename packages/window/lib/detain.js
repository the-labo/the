'use strict'

const get = require('./get')

/**
 * Ask before leave
 * @memberof module:@the-/window
 * @function detail
 * @param {function():boolean} shouldPrevent - Should detain
 * @returns {function()} cancel
 */
function detain(shouldPrevent) {
  const window = get('window')
  const listener = (e) => {
    const prevent = !!shouldPrevent()
    if (prevent) {
      e.preventDefault()
      e.returnValue = ''
    }
  }
  window.addEventListener('beforeunload', listener)

  return () => window.removeEventListener('beforeunload', listener)
}

module.exports = detain
