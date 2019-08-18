'use strict'

const { get } = require('bwindow')

/**
 * Detect is serverside
 * @memberof module:@the-/util-ui
 * @function isServerSide
 * @returns {boolean}
 */
function isServerSide() {
  return !get('window.location')
}

module.exports = isServerSide
