/**
 * Create a TheDriverSequelize instance
 * @memberof @the-/driver-sequelize
 * @function create
 * @param {...*} args
 * @returns {TheDriverSequelize}
 */
'use strict'

const TheDriverSequelize = require('./TheDriverSequelize')

/** @lends @the-/driver-sequelize.create */
function create(...args) {
  return new TheDriverSequelize(...args)
}

module.exports = create
