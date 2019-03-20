/**
 * Error With status 400
 * @memberOf module:@the-/error
 * @augments TheError
 * @class TheInvalidParameterError
 */
'use strict'

const TheError = require('./TheError')

/** @lends TheInvalidParameterError */
class TheInvalidParameterError extends TheError {
}

TheInvalidParameterError.state = 400
TheInvalidParameterError.errorName = 'InvalidParameterError'

module.exports = TheInvalidParameterError
