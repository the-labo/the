/**
 * Error With status 408
 * @memberOf module:@the-/error
 * @augments TheError
 * @class TheRequestTimeoutError
 */
'use strict'

const TheError = require('./TheError')

/** @lends TheRequestTimeoutError */
class TheRequestTimeoutError extends TheError {
}

TheRequestTimeoutError.state = 408
TheRequestTimeoutError.errorName = 'RequestTimeoutError'

module.exports = TheRequestTimeoutError
