'use strict'

const TheAxe = require('./TheAxe')

/**
 * Create a TheAxe instance
 * @memberof module:@the-/axe
 * @function create
 * @param {...*} args
 * @returns {TheAxe}
 */
function create(...args) {
  return new TheAxe(...args)
}

module.exports = create
