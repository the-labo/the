/**
 * @module DefaultValues
 */
'use strict'

module.exports = Object.freeze(
  /** @lends DefaultValues */
  {
    SESSION_CLEANUP_INTERVAL: 30 * 60 * 1000,
    SESSION_EXPIRE_DURATION: 3 * 24 * 60 * 60 * 1000,
  },
)
