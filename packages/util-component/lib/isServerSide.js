/**
 * Detect is serverside
 * @function isServerSide
 * @returns {boolean}
 */
'use strict'

const { get } = require('bwindow')

/** @lends isServerSide */
function isServerSide() {
  return !get('window.location')
}

module.exports = isServerSide
