'use strict'

const ThePS = require('./ThePS')

/**
 * Acquire process
 * @memberof module:@the-/ps
 * @function acquire
 * @param filename
 * @returns {Promise<*>}
 */
async function acquire(filename) {
  const ps = new ThePS(filename, {
    killPolicy: 'ask',
  })
  return ps.acquire()
}

module.exports = acquire
