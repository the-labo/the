'use strict'

const { get } = require('bwindow')

function getUserAgent() {
  return get('window.navigator.userAgent') || ''
}

module.exports = getUserAgent
