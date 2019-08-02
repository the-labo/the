'use strict'

/**
 * Detect src url is video or not
 * @memberof module:@the-/util-ui
 * @function isVideoSrc
 * @param {string} src - Url to detect
 * @returns {boolean} Video or not
 */
const { get } = require('bwindow')
const videoExtensions = require('video-extensions')

const videoExtNames = [...videoExtensions]

/** @lends module:@the-/util-ui.isVideoSrc */
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
