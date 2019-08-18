'use strict'

const JSDoc = require('./JSDoc')

/**
 * Create a JSDoc instance
 * @memberof module:@the-/jsdoc
 * @function create
 * @param {...*} args
 * @returns {JSDoc}
 */
function create(...args) {
  const jsdoc = new JSDoc(...args)
  return jsdoc.bind()
}

module.exports = create
