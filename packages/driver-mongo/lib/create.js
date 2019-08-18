'use strict'

const MongoDriver = require('./MongoDriver')

/**
 * Create a MongoDriver instance
 * @memberof module:@the-/driver-mongo
 * @function create
 * @param {...*} args
 * @returns {MongoDriver}
 */
function create(...args) {
  return new MongoDriver(...args)
}

module.exports = create
