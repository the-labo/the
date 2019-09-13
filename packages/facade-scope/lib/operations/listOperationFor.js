'use strict'

const theAssert = require('@the-/assert')
const busyAccessFor = require('../busyAccessFor')
const countsAccessFor = require('../countsAccessFor')
const entitiesAccessFor = require('../entitiesAccessFor')
const filterAccessFor = require('../filterAccessFor')
const moreAccessFor = require('../moreAccessFor')
const pageAccessFor = require('../pageAccessFor')
const readyAccessFor = require('../readyAccessFor')
const sortAccessFor = require('../sortAccessFor')

/**
 * List for entity
 * @memberof module:@the-/facade-scope
 * @function listOperationFor
 * @param scope
 * @returns {Object}
 */
function listOperationFor(scope) {
  const busyAccess = busyAccessFor(scope)
  const readyAccess = readyAccessFor(scope)
  const pageAccess = pageAccessFor(scope)
  const sortAccess = sortAccessFor(scope)
  const moreAccess = moreAccessFor(scope)
  const filterAccess = filterAccessFor(scope)
  const entitiesAccess = entitiesAccessFor(scope)
  const countsAccess = countsAccessFor(scope)
  const assert = theAssert(`${scope.name} - listOperation`)

  /**
   * @memberof module:@the-/facade-scope.listOperationFor
   * @inner
   * @namespace listOperation
   */
  const listOperation = {
    busyAccess,
    countsAccess,
    entitiesAccess,
    filterAccess,
    moreAccess,
    pageAccess,
    readyAccess,
    sortAccess,
    addOne(entity) {
      const isKnown = entitiesAccess.isKnownOne(entity)
      if (isKnown) {
        return
      }
      entitiesAccess.addOne(entity)
      countsAccess.increase()
    },
    init() {
      scope.init()
    },
    receiveOne(entity) {
      const isKnown = entitiesAccess.isKnownOne(entity)
      if (isKnown) {
        listOperation.updateOne(entity)
      } else {
        listOperation.addOne(entity)
      }
    },
    removeOne(entity) {
      const isKnown = entitiesAccess.isKnownOne(entity)
      if (!isKnown) {
        return
      }
      entitiesAccess.removeOne(entity)
      countsAccess.decrease()
    },
    setCondition(condition) {
      const {
        filter = filterAccess.state,
        page = pageAccess.state,
        sort = sortAccess.state,
      } = condition
      filterAccess.set(filter)
      sortAccess.set(sort)
      pageAccess.set(page)
    },
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
    /**
     * @param {function(Object)} handler - Async handler
     * @returns {Promise<*|Promise<*>>}
     */
    async sync(handler) {
      return busyAccess.while(async () =>
        readyAccess.when(async () => {
          const result = await listOperation._fetch(handler)
          assert(result, 'sync handle must returns result')
          listOperation._save(result)
        }),
      )
    },
    async syncMore(handler) {
      pageAccess.more({})
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
