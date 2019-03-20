/**
 * Error With status 409
 * @memberOf module:@the-/error
 * @augments TheError
 * @class TheConflictError
 */
'use strict'

const TheError = require('./TheError')

/** @lends TheConflictError */
class TheConflictError extends TheError {
}

TheConflictError.state = 409
TheConflictError.errorName = 'ConflictError'

module.exports = TheConflictError
