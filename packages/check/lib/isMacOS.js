'use strict'

const os = require('os')

/**
 * Detect is mac OS
 * @memberof module:@the-/check
 * @function isMacOS
 * @returns {boolean}
 */
function isMacOS() {
  return !!~['Darwin'].indexOf(os.type())
}

module.exports = isMacOS
