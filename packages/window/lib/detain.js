'use strict'

const get = require('./get')

const returnsTrue = () => true

/**
 * Ask before leave
 * @memberof module:@the-/window
 * @function detail
 * @param {function():boolean} [shouldPrevent=() => true] - Should detain
 * @returns {function()} cancel
 */
function detain(shouldPrevent = returnsTrue) {
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
