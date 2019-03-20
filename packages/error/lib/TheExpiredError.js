/**
 * Error With status 400
 * @memberOf module:@the-/error
 * @augments TheError
 * @class TheExpiredError
 */
'use strict'

const TheError = require('./TheError')

/** @lends TheExpiredError */
class TheExpiredError extends TheError {
}

TheExpiredError.state = 400
TheExpiredError.errorName = 'ExpiredError'

module.exports = TheExpiredError
