'use strict'

/**
 * Make sure that entrypoint loaded only once
 * @memberof module:@the-/entrypoint
 * @function singleton
 * @param {Object} [options={}] - Optional settings
 */
const { get, set } = require('@the-/window')

/** @lends module:@the-/entrypoint.singleton */
function singleton(options = {}) {
  const { key = 'app.entrypoint.loaded' } = options
  if (get(key)) {
    throw new Error('[TheEntrypoint] App already loaded')
  }

  set(key, true)
}

module.exports = singleton
