/**
 * Mixins for listen
 * @function listenMix
 * @param {function} Class
 * @returns {function} Mixed class
 */
'use strict'

const {
  ResourceEvents: {
    ENTITY_CREATE,
    ENTITY_CREATE_BULK,
    ENTITY_DESTROY,
    ENTITY_DESTROY_BULK,
    ENTITY_DROP,
    ENTITY_UPDATE,
    ENTITY_UPDATE_BULK,
  },
} = require('clay-resource')
const { unlessProduction } = require('@the-/check')

/** @lends listenMix */
function listenMix(Class) {
  /** @lends ListenMixed */
  return class ListenMixed extends Class {
    increaseListenerMax(amount = 1) {
      const maxListeners = this.getMaxListeners()
      this.setMaxListeners(maxListeners + amount)
    }

    listenEvents(handlers) {
      const closeFuncs = []
      const { resourceName } = this
      for (const [event, handler] of Object.entries(handlers)) {
        const handlerWrap = async function eventListenerWrap(...args) {
          try {
            return await handler(...args)
          } catch (e) {
            console.error(
              `[the-resource][${resourceName}] Error on listener`,
              e,
            )
            throw e
          }
        }
        this.increaseListenerMax(1)
        this.addListener(event, handlerWrap)
        closeFuncs.push(() => this.removeListener(event, handlerWrap))
      }
      return () => closeFuncs.map((close) => close())
    }

    listenTo({ onCreate, onDestroy, onDrop, onUpdate, ...rest }) {
      unlessProduction(() => {
        const restKeys = Object.keys(rest)
        if (restKeys.length > 0) {
          console.warn(`[TheResourceBase] Unknown handles: ${restKeys}`)
        }
      })
      const closeFuncs = [
        onCreate && this.listenToCreate(onCreate),
        onUpdate && this.listenToUpdate(onUpdate),
        onDestroy && this.listenToDestroy(onDestroy),
        onDrop && this.listenToDrop(onDrop),
      ].filter(Boolean)
      return () => closeFuncs.map((close) => close())
    }

    /**
     * Listen to create
     * @param {function} onCreate
     * @returns {function} close function
     */
    listenToCreate(onCreate) {
      return this.listenEvents({
        [ENTITY_CREATE]: async ({ created }) =>
          onCreate({
            created,
            event: ENTITY_CREATE,
          }),
        [ENTITY_CREATE_BULK]: async ({ created }) =>
          Promise.all(
            created.map((created) =>
              onCreate({
                created,
                event: ENTITY_CREATE_BULK,
              }),
            ),
          ),
      })
    }

    /**
     * Listen to destroy
     * @param {function} onDestroy
     * @returns {function} close function
     */
    listenToDestroy(onDestroy) {
      return this.listenEvents({
        [ENTITY_DESTROY]: async ({ destroyed, gone, id }) =>
          destroyed > 0 &&
          (await onDestroy({
            destroyed,
            event: ENTITY_DESTROY,
            gone,
            id,
          })),
        [ENTITY_DESTROY_BULK]: async ({ destroyed, gone, ids }) =>
          Promise.all(
            ids
              .map((id, i) => ({
                destroyed: destroyed[i],
                gone: gone[i],
                id: ids[i],
              }))
              .map(
                ({ destroyed, gone, id }) =>
                  destroyed > 0 &&
                  onDestroy({
                    destroyed,
                    event: ENTITY_DESTROY_BULK,
                    gone,
                    id,
                  }),
              ),
          ),
      })
    }

    /**
     * Listen to drop
     * @param {function} onDrop
     * @returns {function} close function
     */
    listenToDrop(onDrop) {
      return this.listenEvents({
        [ENTITY_DROP]: async ({ dropped }) =>
          onDrop(dropped, {
            event: ENTITY_DROP,
          }),
      })
    }

    /**
     * Listen to update
     * @param {function} onUpdate
     * @returns {function} close function
     */
    listenToUpdate(onUpdate) {
      return this.listenEvents({
        [ENTITY_UPDATE]: async ({ id, old, updated }) =>
          onUpdate({
            event: ENTITY_UPDATE,
            id,
            old,
            updated,
          }),
        [ENTITY_UPDATE_BULK]: async ({ ids, old, updated }) =>
          Promise.all(
            ids.map((id, i) =>
              onUpdate({
                event: ENTITY_UPDATE_BULK,
                id,
                old: old[i],
                updated: updated[id],
              }),
            ),
          ),
      })
    }
  }
}

module.exports = listenMix
