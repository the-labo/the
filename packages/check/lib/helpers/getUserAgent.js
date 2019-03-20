'use strict'

const { get } = require('the-window')

function getUserAgent() {
  return get('window.navigator.userAgent') || ''
}

module.exports = getUserAgent
