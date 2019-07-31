'use strict'

/**
 */
module.exports = Object.freeze({
  parsePattern(pattern) {
    const regExpByString =
      typeof pattern === 'string' && /^\/.*\/$/.test(pattern)
    if (regExpByString) {
      return new RegExp(pattern.replace(/^\/|\/$/g, ''))
    }
    return pattern
  },
})
