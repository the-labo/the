'use strict'
/**
 * Set global values
 * @memberof module:@the-/window
 * @function set
 * @param {string} name - Name to set
 * @param {*} value - Value to set
 * @returns {*}
 */
const { set: setOne } = require('bwindow')
const debug = require('debug')('the:window:set')

/** @lends module:@the-/window.set */
function set(name, value) {
  if (typeof arguments[0] === 'object') {
    for (const [n, v] of Object.entries(arguments[0])) {
      setOne(n, v)
    }
  } else {
    setOne(name, value)
    debug('set window value', name, value)
  }
}

module.exports = set
