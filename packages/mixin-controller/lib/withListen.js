/**
 * Wrap controller
 * @function withListen
 */
'use strict'

/** @lends withListen */
function withListen(Class, options = {}) {
  class WithListen extends Class {}

  return WithListen
}

module.exports = withListen
