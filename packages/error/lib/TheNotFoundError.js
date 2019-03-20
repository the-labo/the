/**
 * Error With status 404
 * @memberOf module:@the-/error
 * @augments TheError
 * @class TheNotFoundError
 */
'use strict'

const TheError = require('./TheError')

/** @lends TheNotFoundError */
class TheNotFoundError extends TheError {
}

TheNotFoundError.state = 404
TheNotFoundError.errorName = 'NotFoundError'

module.exports = TheNotFoundError
