/**
 * Create a JSDoc instance
 * @memberof module:@the-/jsdoc
 * @function create
 * @param {...*} args
 * @returns {JSDoc}
 */
'use strict'

const JSDoc = require('./JSDoc')

/** @lends module:@the-/jsdoc.create */
function create(...args) {
  const jsdoc = new JSDoc(...args)
  return jsdoc.bind()
}

module.exports = create
