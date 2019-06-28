/**
 * Bush scope access
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
   * @memberof module:@the-/facade-scope.editOperationFor
   * @inner
   * @namespace editOperationFor
   */
  const editOperationFor = {
    busyAccess,
    entityAccess,
    entryAccess,
    async exec(handler) {
      const { state: id } = idAccess
      await busyAccess.while(async () =>
        entryAccess.process((entry) => handler(id, entry)),
      )
    },
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
    async sync(handler) {
      return busyAccess.while(async () => {
        const { state: id } = idAccess
        const entity = await handler(id)
        entityAccess.set(entity)
      })
    },
  }

  Object.freeze(editOperationFor)

  return editOperationFor
}

module.exports = editOperationFor
