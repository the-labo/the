'use strict'

/**
 * Handle when online
 * @memberof module:@the-/entrypoint
 * @function online
 * @param {Object} [options=[]] - Optional settings
 */
const { get, line } = require('@the-/window')

/** @lends module:@the-/entrypoint.online */
function online() {
  let isOffline = false
  line((detected) => {
    const gotOnline = isOffline && detected
    if (gotOnline) {
      const location = get('window.location')
      location.reload()
    }
    isOffline = !detected
  })
}

module.exports = online
