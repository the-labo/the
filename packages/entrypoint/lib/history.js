/**
 * Get history object
 * @memberof module:@the-/entrypoint
 * @function history
 * @returns {Object} history
 */
'use strict'

const { createBrowserHistory, createMemoryHistory } = require('history')
const { get } = require('@the-/window')

/** @lends module:@the-/entrypoint.history */
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
