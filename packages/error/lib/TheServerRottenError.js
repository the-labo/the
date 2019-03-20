/**
 * Error With status 500
 * @memberOf module:@the-/error
 * @augments TheError
 * @class TheServerRottenError
 */
'use strict'

const TheError = require('./TheError')

/** @lends TheServerRottenError */
class TheServerRottenError extends TheError {
}

TheServerRottenError.state = 500
TheServerRottenError.errorName = 'ServerRottenError'

module.exports = TheServerRottenError
