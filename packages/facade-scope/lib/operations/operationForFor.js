/**
 * Bush scope access
 * @memberof module:@the-/facade-scope
 * @function operationForFor
 * @param {Object} scope
 * @returns {Object} - Face object for operationFor access
 */
'use strict'

const busyAccessFor = require('../busyAccessFor')

/** @lends module:@the-/facade-scope.operationForFor */
function operationForFor(scope) {
  const busyAccess = busyAccessFor(scope)
  /**
   * @memberof module:@the-/facade-scope.operationForFor
   * @inner
   * @namespace operationFor
   */
  const operationFor = {
    busyAccess,
    async exec(handler) {
      await busyAccess.while(async () => handler())
    },
  }

  Object.freeze(operationFor)

  return operationFor
}

module.exports = operationForFor
