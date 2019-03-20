/**
 * Acquire process
 * @memberOf module:@the-/ps
 * @function acquire
 */
'use strict'

const ThePS = require('./ThePS')

/** @lends acquire */
async function acquire(filename) {
  const ps = new ThePS(filename, {
    killPolicy: 'ask',
  })
  return ps.acquire()
}

module.exports = acquire
