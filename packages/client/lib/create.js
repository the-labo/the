'use strict'

const TheClient = require('./TheClient')

/**
 * Create a TheClient instance
 * @memberof module:@the-/client
 * @function create
 * @param {...*} args
 * @returns {TheClient}
 */
function create(...args) {
  return new TheClient(...args)
}

module.exports = create
