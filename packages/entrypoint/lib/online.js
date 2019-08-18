'use strict'

const { get, line } = require('@the-/window')

/**
 * Handle when online
 * @memberof module:@the-/entrypoint
 * @function online
 * @param {Object} [options=[]] - Optional settings
 */
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
