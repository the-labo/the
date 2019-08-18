'use strict'

const path = require('path')
const videoExtensions = require('video-extensions')

/**
 * @memberof module:@the-/video-converter
 * @function isVideoSrc
 * @param src
 * @returns {*}
 */
function isVideoSrc(src) {
  const { pathname } = new URL(src, 'relative:///')
  const extension = path.extname(pathname).replace(/^\./, '')
  return videoExtensions.includes(extension)
}

module.exports = isVideoSrc
