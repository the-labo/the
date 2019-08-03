'use strict'

/**
 * Wait until file exists
 * @function waitForFile
 * @param {function()} condition
 * @param {Object} [options={}] - Optional setting
 * @returns {Promise}
 */
const asleep = require('asleep')

/** @lends waitFor */
async function waitFor(condition, options = {}) {
  const { interval = 100, timeout = 300000 } = options
  const startAt = new Date()
  let ready
  do {
    ready = !!condition()
    const took = new Date() - startAt
    if (took > timeout) {
      throw new Error(`[waitForFile] Time out to wait for file: ${condition}`)
    }

    await asleep(interval)
  } while (!ready)
}

module.exports = waitFor
