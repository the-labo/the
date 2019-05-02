/**
 * Acquire process
 * @memberof module:@the-/ps
 * @function acquire
 */
'use strict'

const ThePS = require('./ThePS')

/** @lends module:@the-/ps.acquire */
async function acquire(filename) {
  const ps = new ThePS(filename, {
    killPolicy: 'ask',
  })
  return ps.acquire()
}

module.exports = acquire
