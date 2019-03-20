/**
 * Error With status 410
 * @memberOf module:@the-/error
 * @augments TheError
 * @class TheGoneError
 */
'use strict'

const TheError = require('./TheError')

/** @lends TheGoneError */
class TheGoneError extends TheError {
}

TheGoneError.state = 410
TheGoneError.errorName = 'GoneError'

module.exports = TheGoneError
