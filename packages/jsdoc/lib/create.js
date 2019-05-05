/**
 * Create a Jsdoc instance
 * @memberof module:jsdoc
 * @function create
 * @param {...*} args
 * @returns {Jsdoc}
 */
'use strict'

const Jsdoc = require('./Jsdoc')

/** @lends module:jsdoc.create */
function create(...args) {
  const jsdoc = new Jsdoc(...args)
  return jsdoc.bind()
}

module.exports = create
