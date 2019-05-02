/**
 * Create a TheClient instance
 * @memberof module:@the-/client
 * @function create
 * @param {...*} args
 * @returns {TheClient}
 */
'use strict'

const TheClient = require('./TheClient')

/** @lends module:@the-/client.create */
function create(...args) {
  return new TheClient(...args)
}

module.exports = create
