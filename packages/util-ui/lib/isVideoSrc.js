'use strict'

const { get } = require('bwindow')
const videoExtensions = require('video-extensions')

const videoExtNames = [...videoExtensions]

/** @deprecated */
function isVideoSrc(src) {
  console.warn(`[@the-/util-ui] isVideoSrc is now deprecated. Use @the-/util-string instead.`)
  const { pathname } = new URL(
    src || '',
    get('location.origin') || 'http://localhost',
  )
  const basename = pathname.split('/').pop()
  const extname = /\./.test(basename) && basename.split(/\./).pop()
  return videoExtNames.includes(extname)
}

module.exports = isVideoSrc
