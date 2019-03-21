/**
 * Make sure that entrypoint loaded only once
 * @function singleton
 * @param {Object} [options={}] - Optional settings
 */
'use strict'

const { get, set } = require('@the-/window')

/** @lends singleton */
function singleton(options = {}) {
  const { key = 'app.entrypoint.loaded' } = options
  if (get(key)) {
    throw new Error('[TheEntrypoint] App already loaded')
  }
  set(key, true)
}

module.exports = singleton
