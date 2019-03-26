'use strict'
const saveBase64 = require('./saveBase64')

/** @deprecated */
function saveBase64Image() {
  console.warn(
    '[the-server-util] `saveBase64()` is now deprecated. Use `saveBase64()` instead',
  )
  return saveBase64(...arguments)
}

module.exports = saveBase64Image
