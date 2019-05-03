/**
 * Define an error class
 * @memberof module:@the-/error
 * @function define
 * @returns {function()} Error class
 */
'use strict'

const TheError = require('./TheError')

/** @lends define */
function define(name, options = {}) {
  let { status = 400 } = options
  class DefinedError extends TheError {}
  DefinedError.errorName = name
  DefinedError.status = status
  return DefinedError
}

module.exports = define
