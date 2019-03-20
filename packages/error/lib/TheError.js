/**
 * Basic error
 * @memberOf module:@the-/error
 * @class TheError
 */
'use strict'

/** @lends TheError */
class TheError extends Error {
  constructor(message, detail = {}, options = {}) {
    const { resolved = false } = options
    super(message)
    this.detail = detail
    this.status = this.constructor.status || 400
    this.name = this.constructor.errorName || this.constructor.name || 'error'
    this.resolved = resolved
  }
}

TheError.errorName = 'Error'
TheError.status = 400

TheError.withName = (name, options = {}) => {
  const { status = 400 } = options
  return Object.assign(class NamedError extends TheError {}, {
    errorName: name,
    status,
  })
}

module.exports = TheError
