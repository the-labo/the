'use strict'

const busyAccessFor = require('../busyAccessFor')
const entityAccessFor = require('../entityAccessFor')
const idAccessFor = require('../idAccessFor')
const readyAccessFor = require('../readyAccessFor')

/**
 * Scope access
 * @memberof module:@the-/facade-scope
 * @function detailOperationFor
 * @param {Object} scope
 * @returns {Object} - Face object for detailOperation access
 */
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
    getEntity() {
      return entityAccess.state
    },
    getId() {
      return idAccess.state
    },
    init() {
      scope.init()
    },
    setEntity(entity) {
      entityAccess.set(entity)
    },
    setId(id) {
      idAccess.set(id)
    },
    async sync(handler) {
      const { state: id } = idAccess
      if (!id) {
        console.warn(
          '[@the-/facade] sync() is skipped in detail operation because id is missing',
        )
        return
      }

      return busyAccess.while(async () =>
        readyAccess.when(async () => {
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
