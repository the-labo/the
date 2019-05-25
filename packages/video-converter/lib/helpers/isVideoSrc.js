'use strict'
/**
 * @memberof module:@the-/video-converter
 * @function isVideoSrc
 */
const path = require('path')
const videoExtensions = require('video-extensions')

/** @lends module:@the-/video-converter.isVideoSrc */
function isVideoSrc(src) {
  const { pathname } = new URL(src, 'relative:///')
  const extension = path.extname(pathname).replace(/^\./, '')
  return videoExtensions.includes(extension)
}

module.exports = isVideoSrc
