'use strict'

const open = require('./open')

/**
 * @deprecated
 * @param url*/
function show(url) {
  console.warn('[@the-/window] show() is now deprecated. Use open() instead')
  open(url)
}

module.exports = show
