'use strict'
/**
 * Detect src url is video or not
 * @memberof module:@the-/util-ui
 * @function isVideoSrc
 * @param {string} src - Url to detect
 * @returns {boolean} Video or not
 */
const { get } = require('bwindow')
const path = require('path')
const videoExtensions = require('video-extensions')

const videoExtNames = [...videoExtensions]

/** @lends module:@the-/util-ui.isVideoSrc */
function isVideoSrc(src) {
  const { pathname } = new URL(
    src || '',
    get('location.origin') || 'http://localhost',
  )
  return videoExtNames.includes(path.extname(pathname).replace(/^\./, ''))
}

module.exports = isVideoSrc
