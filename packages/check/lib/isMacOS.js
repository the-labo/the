'use strict'

/**
 * Detect is mac OS
 * @memberof module:@the-/check
 * @function isMacOS
 * @returns {boolean}
 */
const os = require('os')

/** @lends module:@the-/check.isMacOS */
function isMacOS() {
  return !!~['Darwin'].indexOf(os.type())
}

module.exports = isMacOS
