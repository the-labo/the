/**
 * Handle when online
 * @function online
 * @param {Object} [options=[]] - Optional settings
 */
'use strict'

const { get, line } = require('@the-/window')

/** @lends online */
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
