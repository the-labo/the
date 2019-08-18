'use strict'

const busyAccessFor = require('../busyAccessFor')

/**
 * Scope access
 * @memberof module:@the-/facade-scope
 * @function operationFor
 * @param {Object} scope
 * @returns {Object} - Face object for operationFor access
 */
function operationFor(scope) {
  const busyAccess = busyAccessFor(scope)
  /**
   * @memberof module:@the-/facade-scope.operationFor
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

module.exports = operationFor
