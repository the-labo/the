/**
 * Scope access
 * @memberof module:@the-/facade-scope
 * @function destroyOperationFor
 * @param {Object} scope
 * @returns {Object} - Face object for destroyOperationFor access
 */
'use strict'

const busyAccessFor = require('../busyAccessFor')
const entityAccessFor = require('../entityAccessFor')
const idAccessFor = require('../idAccessFor')

/** @lends module:@the-/facade-scope.destroyOperationFor */
function destroyOperationFor(scope) {
  const busyAccess = busyAccessFor(scope)
  const idAccess = idAccessFor(scope)
  const entityAccess = entityAccessFor(scope)
  /**
   * @memberof module:@the-/facade-scope.destroyOperationFor
   * @inner
   * @namespace destroyOperation
   */
  const destroyOperation = {
    busyAccess,
    entityAccess,
    idAccess,
    init() {
      scope.init()
    },
    setId(id) {
      idAccess.set(id)
    },
    async exec(handler) {
      await busyAccess.while(async () => {
        await handler()
      })
    },
    async sync(handler) {
      return busyAccess.while(async () => {
        const { state: id } = idAccess
        const entity = await handler(id)
        entityAccess.set(entity)
      })
    },
  }

  Object.freeze(destroyOperation)

  return destroyOperation
}

module.exports = destroyOperationFor
