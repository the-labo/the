'use strict'

const { get } = require('bwindow')

const withDocument = (callback) => {
  const document = get('document')
  if (!document) {
    return
  }

  if (/comp|inter|loaded/.test(document.readyState)) {
    callback(document)
  } else {
    document.addEventListener(
      'DOMContentLoaded',
      () => callback(document),
      false,
    )
  }
}

const withWindow = (callback) => {
  const window = get('window')
  if (!window) {
    return
  }

  callback(window)
}

/**
 * @memberof module:@the-/polyfill
 * @namespace helpers
 */
module.exports = {
  withDocument,
  withWindow,
}
