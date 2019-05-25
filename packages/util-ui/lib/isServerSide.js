'use strict'
/**
 * Detect is serverside
 * @memberof module:@the-/util-ui
 * @function isServerSide
 * @returns {boolean}
 */
const { get } = require('bwindow')

/** @lends module:@the-/util-ui.isServerSide */
function isServerSide() {
  return !get('window.location')
}

module.exports = isServerSide
