/**
 * Scope access
 * @memberof module:@the-/facade-scope
 * @function editOperationFor
 * @param {Object} scope
 * @returns {Object} - Face object for editOperationFor access
 */
'use strict'

const busyAccessFor = require('../busyAccessFor')
const entityAccessFor = require('../entityAccessFor')
const entryAccessFor = require('../entryAccessFor')
const idAccessFor = require('../idAccessFor')

/** @lends module:@the-/facade-scope.editOperationFor */
function editOperationFor(scope) {
  const idAccess = idAccessFor(scope)
  const entryAccess = entryAccessFor(scope)
  const busyAccess = busyAccessFor(scope)
  const entityAccess = entityAccessFor(scope)

  /**
   * @memberof module:@the-/facade-scope.editOperation
   * @inner
   * @namespace editOperation
   */
  const editOperation = {
    busyAccess,
    entityAccess,
    entryAccess,
    idAccess,
    init() {
      scope.init()
    },
    setEntry(entry) {
      entryAccess.set(entry)
    },
    setId(id) {
      idAccess.set(id)
    },
    async exec(handler) {
      const { state: id } = idAccess
      await busyAccess.while(async () =>
        entryAccess.process((entry) => handler(id, entry)),
      )
    },
    async sync(handler) {
      return busyAccess.while(async () => {
        const { state: id } = idAccess
        const entity = await handler(id)
        entityAccess.set(entity)
      })
    },
  }

  Object.freeze(editOperation)

  return editOperation
}

module.exports = editOperationFor
