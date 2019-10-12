'use strict'

/**
 * Convert base64 data into blob
 * module:@the-/util-ui
 * @param {string} base64String - base64 encoded string
 * @returns {?Blob}
 */
function base64ToBlob(base64String) {
  if (!base64String) {
    return null
  }

  const matched = base64String.match(/^data:(.*);base64,(.*)/)
  if (!matched) {
    return null
  }

  const [, contentType, payload] = matched

  const byteCharacters = atob(payload)
  const byteArrays = []

  const chunkSize = 1024
  for (let offset = 0; offset < byteCharacters.length; offset += chunkSize) {
    const slice = byteCharacters.slice(offset, offset + chunkSize)

    const byteNumbers = new Array(slice.length)
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i)
    }

    const byteArray = new Uint8Array(byteNumbers)

    byteArrays.push(byteArray)
  }
  return new Blob(byteArrays, { type: contentType })
}

module.exports = base64ToBlob
