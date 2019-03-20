/**
 * Error With status 401
 * @memberOf module:@the-/error
 * @augments TheError
 * @class TheUnauthorizedError
 */
'use strict'

const TheError = require('./TheError')

/** @lends TheUnauthorizedError */
class TheUnauthorizedError extends TheError {
}

TheUnauthorizedError.state = 401
TheUnauthorizedError.errorName = 'UnauthorizedError'

module.exports = TheUnauthorizedError
