/**
 * @function handleUnknownKeys
 */
'use strict'

/** @lends handleUnknownKeys */
function handleUnknownKeys(unknowns, { label = '' } = {}) {
  const unknownKeys = Object.keys(unknowns)
  if (unknownKeys.length > 0) {
    console.warn(`[TheRTC][${label}] Unknown keys:`, unknownKeys)
  }
}

module.exports = handleUnknownKeys
