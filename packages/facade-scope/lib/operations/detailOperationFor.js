/**
 * Scope access
 * @memberof module:@the-/facade-scope
 * @function detailOperationFor
 * @param {Object} scope
 * @returns {Object} - Face object for detailOperation access
 */
'use strict'

const busyAccessFor = require('../busyAccessFor')
const entityAccessFor = require('../entityAccessFor')
const idAccessFor = require('../idAccessFor')
const readyAccessFor = require('../readyAccessFor')

/** @lends module:@the-/facade-scope.detailOperationFor */
function detailOperationFor(scope) {
  const idAccess = idAccessFor(scope)
  const busyAccess = busyAccessFor(scope)
  const readyAccess = readyAccessFor(scope)
  const entityAccess = entityAccessFor(scope)
  /**
   * @memberof module:@the-/facade-scope.detailOperationFor
   * @inner
   * @namespace detailOperation
   */
  const detailOperation = {
    busyAccess,

    entityAccess,

    idAccess,
    readyAccess,
    init() {
      scope.init()
    },
    setId(id) {
      idAccess.set(id)
    },
    async sync(handler) {
      return busyAccess.while(async () =>
        readyAccess.when(async () => {
          const { state: id } = idAccess
          const entity = await handler(id)
          entityAccess.set(entity)
        }),
      )
    },
  }

  Object.freeze(detailOperation)

  return detailOperation
}

module.exports = detailOperationFor
