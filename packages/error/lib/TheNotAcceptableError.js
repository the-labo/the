/**
 * Error With status 406
 * @memberOf module:@the-/error
 * @augments TheError
 * @class TheNotAcceptableError
 */
'use strict'

const TheError = require('./TheError')

/** @lends TheNotAcceptableError */
class TheNotAcceptableError extends TheError {
}

TheNotAcceptableError.state = 406
TheNotAcceptableError.errorName = 'NotAcceptableError'

module.exports = TheNotAcceptableError
