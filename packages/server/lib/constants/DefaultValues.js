'use strict'

const SECOND = 1000
const MINUTE = 60 * SECOND

module.exports = Object.freeze(
  /**
   * @memberof module:@the-/server.constants
   * @namespace DefaultValues
   */
  {
    SESSION_CLEANUP_INTERVAL: 30 * MINUTE,
    SESSION_EXPIRE_DURATION: 3 * 24 * 60 * MINUTE,
  },
)
