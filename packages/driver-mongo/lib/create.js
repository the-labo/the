'use strict'

/**
 * Create a MongoDriver instance
 * @memberof module:@the-/driver-mongo
 * @function create
 * @param {...*} args
 * @returns {MongoDriver}
 */
const MongoDriver = require('./MongoDriver')

/** @lends module:@the-/driver-mongo.create */
function create(...args) {
  return new MongoDriver(...args)
}

module.exports = create
