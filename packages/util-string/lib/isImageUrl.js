'use strict'

const imageExtensions = require('image-extensions')
const isUrl = require('./isUrl')

const imageExtensionsSet = new Set(imageExtensions)

/**
 * Image url or not
 * @memberof module:@the-/util-string
 * @function isImageURL
 * @param {string} value - String value to check
 * @returns {boolean} URL or not
 */
function isImageUrl(value) {
  if (!isUrl(value)) {
    return false
  }

  const { pathname } = new URL(value)
  const extname = pathname.split('.').pop()
  if (!extname) {
    return false
  }

  return (
    imageExtensionsSet.has(extname) ||
    imageExtensionsSet.has(extname.toLowerCase())
  )
}

module.exports = isImageUrl
