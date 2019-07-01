/**
 * Context wrapper
 * @memberof module:@the-/facade-context
 * @function storeLoaderFor
 * @param {Object} context
 * @returns {Object} - Face object for storeLoader access
 */
'use strict'

/** @lends module:@the-/facade-context.storeLoaderFor */
function storeLoaderFor (context) {
  /**
   * @memberof module:@the-/facade-context.storeLoaderFor
   * @inner
   * @namespace storeLoader
   */
  const storeLoader = {
    /**
     * Load store
     * @param {Object} store - Store object
     * @returns {Object} Loaded store
     */
    load (store) {
      store.subscribe(() => context.set({ state: store.state }))
      context.set({ state: store.state })
      return store
    }
  }

  Object.freeze(storeLoader)

  return storeLoader
}

module.exports = storeLoaderFor
