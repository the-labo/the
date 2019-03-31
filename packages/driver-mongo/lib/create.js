/**
 * Create a MongoDriver instance
 * @function create
 * @param {...*} args
 * @returns {MongoDriver}
 */
'use strict'

const MongoDriver = require('./MongoDriver')

/** @lends create */
function create(...args) {
  return new MongoDriver(...args)
}

module.exports = create
