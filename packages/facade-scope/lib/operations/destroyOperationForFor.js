/**
 * Bush scope access
 * @memberof module:@the-/facade-scope
 * @function destroyOperationForFor
 * @param {Object} scope
 * @returns {Object} - Face object for destroyOperationFor access
 */
'use strict'

const busyAccessFor = require('../busyAccessFor')
const entityAccessFor = require('../entityAccessFor')
const idAccessFor = require('../idAccessFor')

/** @lends module:@the-/facade-scope.destroyOperationForFor */
function destroyOperationForFor(scope) {
  const busyAccess = busyAccessFor(scope)
  const idAccess = idAccessFor(scope)
  const entityAccess = entityAccessFor(scope)
  /**
   * @memberof module:@the-/facade-scope.destroyOperationForFor
   * @inner
   * @namespace destroyOperationFor
   */
  const destroyOperationFor = {
    busyAccess,
    entityAccess,
    async exec(handler) {
      await busyAccess.while(async () => {
        await handler()
      })
    },
    idAccess,
    init() {
      scope.init()
    },
    setId(id) {
      idAccess.set(id)
    },
    async sync(handler) {
      return busyAccess.while(async () => {
        const { state: id } = idAccess
        const entity = await handler(id)
        entityAccess.set(entity)
      })
    },
  }

  Object.freeze(destroyOperationFor)

  return destroyOperationFor
}

module.exports = destroyOperationForFor
