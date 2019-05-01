/**
 * As pon task
 * @module @the-/ps/pon
 */
'use strict'

const thePS = require('./lib/create')

function thePSTask(dirname) {
  return async function task() {
    await thePS(dirname).acquire()
  }
}

module.exports = thePSTask
