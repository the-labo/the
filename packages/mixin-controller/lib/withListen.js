'use strict'
/**
 * Wrap controller
 * @function withListen
 */
/** @lends withListen */
function withListen(Class, options = {}) {
  class WithListen extends Class {}

  return WithListen
}

module.exports = withListen
