/**
 * List for entity
 * @memberof module:@the-/facade-scope
 * @function listOperationFor
 * @returns {module:@the-/facade-scope.listOperationFor~listOperation}
 */
'use strict'

const busyAccessFor = require('../busyAccessFor')
const countsAccessFor = require('../countsAccessFor')
const entitiesAccessFor = require('../entitiesAccessFor')
const filterAccessFor = require('../filterAccessFor')
const moreAccessFor = require('../moreAccessFor')
const pageAccessFor = require('../pageAccessFor')
const readyAccessFor = require('../readyAccessFor')
const sortAccessFor = require('../sortAccessFor')

/** @lends module:@the-/facade-scope.listOperationAccessFor */
function listOperationFor(scope) {
  const busyAccess = busyAccessFor(scope)
  const readyAccess = readyAccessFor(scope)
  const pageAccess = pageAccessFor(scope)
  const sortAccess = sortAccessFor(scope)
  const moreAccess = moreAccessFor(scope)
  const filterAccess = filterAccessFor(scope)
  const entitiesAccess = entitiesAccessFor(scope)
  const countsAccess = countsAccessFor(scope)

  /**
   * @memberof module:@the-/facade-scope.listOperationFor
   * @inner
   * @namespace listOperation
   */
  const listOperation = {
    async _fetch(handler) {
      const { state: filter } = filterAccess
      const { state: page } = pageAccess
      const { state: sort } = sortAccess
      return handler({ filter, page, sort })
    },
    async _save(result) {
      entitiesAccess.set(result.entities)
      countsAccess.set(result.meta)
      const hasMore = countsAccess.hasMore()
      moreAccess.setHas(hasMore)
    },
    busyAccess,
    countsAccess,

    entitiesAccess,

    filterAccess,
    init() {
      scope.init()
    },
    moreAccess,
    pageAccess,
    readyAccess,
    setCondition(condition) {
      const { filter, page, sort } = condition
      filterAccess.set(filter)
      sortAccess.set(sort)
      pageAccess.set(page)
    },
    sortAccess,
    /**
     * @param {function(Object)} handler - Async handler
     * @returns {Promise<*|Promise<*>>}
     */
    async sync(handler) {
      return busyAccess.while(async () =>
        readyAccess.when(async () => {
          const result = await listOperation._fetch(handler)
          listOperation._save(result)
        }),
      )
    },
    async syncMore(handler) {
      return moreAccess.busyWhile(async () => {
        const result = await listOperation._fetch(handler)
        listOperation._save(result)
      })
    },
  }

  Object.freeze(listOperation)

  return listOperation
}

module.exports = listOperationFor
