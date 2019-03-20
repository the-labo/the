/**
 * Create a TheClient instance
 * @memberOf module:@the-/client
 * @function create
 * @param {...*} args
 * @returns {TheClient}
 */
'use strict'

const TheClient = require('./TheClient')

/** @lends create */
function create(...args) {
  return new TheClient(...args)
}

module.exports = create
