/**
 * @memberOf module:@the-/db
 * @function refreshMix
 * @param {function} Class
 * @return {function} Mixed Class
 */
'use strict'

const asleep = require('asleep')
const { parse: parseEntityRef } = require('clay-resource-ref')
const { unlessProduction } = require('@the-/check')
const { TheRefresher } = require('@the-/refresher')

const assertIsRef = (ref) => {
  const type = typeof ref
  if (type !== 'string') {
    throw new Error(`[TheDB] Ref must be string, bud passed ${type}`)
  }
}

/** @lends module:@the-/db.refreshMix */
function refreshMix(Class) {
  /**
   * @memberOf module:@the-/db.refreshMix
   * @inner
   */
  class RefreshMixed extends Class {
    constructor() {
      super(...arguments)
      this._refresher = null
    }

    /**
     * Request to refresh entity
     * @param {string} entityRef
     */
    requestToRefresh(entityRef) {
      if (!entityRef) {
        return
      }
      unlessProduction(() => assertIsRef(entityRef))
      this._refresher.request(entityRef)
    }

    /**
     * Start refreshing loop
     * @param {number} interval
     */
    startRefreshLoop({ interval = 300 } = {}) {
      if (this._refresher) {
        throw new Error(`[TheDB]refreshLoop already started`)
      }
      this._refresher = new TheRefresher(
        async (entityRef) => this.doRefresh(entityRef),
        {
          interval,
        },
      )
      this._refresher.start()
    }

    /**
     * Stop refreshing loop
     */
    stopRefreshLoop() {
      if (!this._refresher) {
        return
      }
      this._refresher.stop()
      this._refresher = null
    }

    async doRefresh(entityRef) {
      unlessProduction(() => assertIsRef(entityRef))
      const { resource: resourceName } = parseEntityRef(entityRef)
      const resource = this.getResource(resourceName)
      if (!resource) {
        return
      }
      if (!resource.refresh) {
        return
      }
      try {
        const entity = await this.resolveEntityRef(entityRef)
        if (entity) {
          await resource.refresh(entity)
        } else {
          console.warn(`[TheDB][refresh] Entity ${entityRef} is not found`)
        }
      } catch (caught) {
        const err = new Error(
          `[TheDB] Failed to refresh ${entityRef} ( ${String(caught)} )`,
        )
        err.stack = caught.stack
        throw err
      }
    }

    /**
     * Wait until refresh
     * @param {string} entityRef
     * @param {Object} [options={}] - Optional settings
     * @returns {Promise<boolean>} - Full filled
     */
    async waitToRefresh(entityRef, options = {}) {
      if (entityRef.$$entity) {
        entityRef = entityRef.toRef()
      }
      unlessProduction(() => assertIsRef(entityRef))
      const { interval = 10, timeout = 60 * 1000 } = options
      const startedAt = new Date()
      while (this._refresher.has(entityRef)) {
        await asleep(interval)
        const passed = new Date() - startedAt
        if (timeout < passed) {
          return false
        }
      }
      await asleep(interval)
      return true
    }
  }

  return RefreshMixed
}

module.exports = refreshMix
