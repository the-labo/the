'use strict'

const asleep = require('asleep')
const get = require('./get')

/**
 * Reload location
 * @memberof module:@the-/window
 * @function reload
 * @param {Object} [options={}] - Optional setting
 * @returns {Promise<undefined>}
 */
async function reload(options = {}) {
  const location = get('location')
  const { timeout = 30000 } = options
  location.reload()
  await asleep(timeout) // Wait for reload
  throw new Error('Failed to reload')
}

module.exports = reload
