/**
 * Get history object
 */
'use strict'

const { createBrowserHistory, createMemoryHistory } = require('history')
const { get } = require('@the-/window')

function history() {
  if (history.singleton) {
    return history.singleton
  }
  const creator = get('window.document')
    ? createBrowserHistory
    : createMemoryHistory
  history.singleton = creator()
  return history()
}

history.singleton = null

module.exports = history
