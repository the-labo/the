'use strict'

const asleep = require('asleep')
const { get } = require('@the-/window')

/**
 * Get element by id
 * @memberof module:@the-/util-dom
 * @function byId
 * @param {string} id - Id of dom element
 * @returns {?HTMLElement} - Found element
 */
function byId(id) {
  const document = get('document')
  if (!document) {
    return null
  }

  return document.getElementById(id)
}

/**
 * Get element by id
 * @function module:@the-/util-dom.byId.withRetry
 * @param {string} id - Id of dom element
 * @param {Object} [options={}] - Optional settings
 * @returns {Promise<?HTMLElement>} - Found element
 */
byId.withRetry = async function byIdWithRetry(id, options = {}) {
  const { retry = 0, retryInterval = 300 } = options
  const found = byId(id)
  if (found) {
    return found
  }

  if (retry > 0) {
    await asleep(retryInterval)
    return byId(id, {
      ...options,
      retry: retry - 1,
    })
  }
}

module.exports = byId
