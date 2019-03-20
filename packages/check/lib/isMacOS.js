/**
 * Detect is mac OS
 * @function isMacOS
 * @returns {boolean}
 */
'use strict'

const os = require('os')

/** @lends isMacOS */
function isMacOS() {
  return !!~['Darwin'].indexOf(os.type())
}

module.exports = isMacOS
