'use strict'

const TheClient = require('./TheClient')

/**
 * Create a TheClient instance
 * @param {...*} args
 * @returns {TheClient}
 */
function create(...args) {
  return new TheClient(...args)
}

module.exports = create
