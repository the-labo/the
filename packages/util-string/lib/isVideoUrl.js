'use strict'

const videoExtensions = require('video-extensions')
const isUrl = require('./isUrl')

const videoExtensionsSet = new Set(videoExtensions)

/**
 * Video url or not
 * @memberof module:@the-/util-string
 * @function isVideoURL
 * @param {string} value - String value to check
 * @returns {boolean} URL or not
 */
function isVideoUrl(value) {
  if (!isUrl(value)) {
    return false
  }
  const { pathname } = new URL(value)
  const extname = pathname.split('.').pop()
  if (!extname) {
    return false
  }
  return (
    videoExtensionsSet.has(extname) ||
    videoExtensionsSet.has(extname.toLowerCase())
  )
}

module.exports = isVideoUrl
