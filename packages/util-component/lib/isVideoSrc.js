/**
 * Detect src url is video or not
 * @function isVideoSrc
 * @param {string} src - Url to detect
 * @return {boolean} Video or not
 */
'use strict'

const path = require('path')
const { parse: parseUrl } = require('url')
const videoExtensions = require('video-extensions')

const videoExtNames = [...videoExtensions]

/** @lends isVideoSrc */
function isVideoSrc(src) {
  const { pathname } = parseUrl(src || '')
  return videoExtNames.includes(path.extname(pathname).replace(/^\./, ''))
}

module.exports = isVideoSrc
