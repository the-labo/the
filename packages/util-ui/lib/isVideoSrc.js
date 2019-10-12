'use strict'

const { get } = require('bwindow')
const videoExtensions = require('video-extensions')

const videoExtNames = [...videoExtensions]

/**
 * Detect src url is video or not
 * @memberof module:@the-/util-ui
 * @function isVideoSrc
 * @deprecated use `@the-/util.isVideoUrl()` instead
 * @param {string} src - Url to detect
 * @returns {boolean} Video or not
 */
function isVideoSrc(src) {
  const { pathname } = new URL(
    src || '',
    get('location.origin') || 'http://localhost',
  )
  const basename = pathname.split('/').pop()
  const extname = /\./.test(basename) && basename.split(/\./).pop()
  return videoExtNames.includes(extname)
}

module.exports = isVideoSrc
