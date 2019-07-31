'use strict'

/**
 * Define an error class
 * @memberof module:@the-/error
 * @function define
 * @returns {function()} Error class
 */
const TheError = require('./TheError')

/** @lends define */
function define(name, options = {}) {
  const { status = 400 } = options

  class DefinedError extends TheError {}

  DefinedError.errorName = name
  DefinedError.status = status
  return DefinedError
}

module.exports = define
