/**
 * Error With status 403
 * @memberOf module:@the-/error
 * @augments TheError
 * @class TheForbiddenError
 */
'use strict'

const TheError = require('./TheError')

/** @lends TheForbiddenError */
class TheForbiddenError extends TheError {
}

TheForbiddenError.state = 403
TheForbiddenError.errorName = 'ForbiddenError'

module.exports = TheForbiddenError
