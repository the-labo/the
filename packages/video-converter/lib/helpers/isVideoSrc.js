/**
 * @function isVideoSrc
 */
'use strict'

const path = require('path')
const url = require('url')
const videoExtensions = require('video-extensions')

/** @lends isVideoSrc */
function isVideoSrc(src) {
  const { pathname } = url.parse(src)
  const extension = path.extname(pathname).replace(/^\./, '')
  return videoExtensions.includes(extension)
}

module.exports = isVideoSrc
