'use strict'

const TheDriverSequelize = require('./TheDriverSequelize')

/**
 * Create a TheDriverSequelize instance
 * @memberof @the-/driver-sequelize
 * @function create
 * @param {...*} args
 * @returns {TheDriverSequelize}
 */
function create(...args) {
  return new TheDriverSequelize(...args)
}

module.exports = create
