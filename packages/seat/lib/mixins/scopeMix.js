'use strict'
/**
 * @memberof module:@the-/seat
 * @function scopeMix
 */
const { escape } = require('json-pointer')

/** @lends module:@the-/seat.scopeMix */
function scopeMix(Class) {
  return class ScopeMixed extends Class {
    scopePathFor(...names) {
      const { scopeName } = this
      const prefix = scopeName ? `/@${escape(scopeName)}` : ''
      return [prefix, ...names.map(escape)].join('/')
    }

    subScopeNameOf(scopeName) {
      return [this.scopeName, scopeName].filter(Boolean).join('/')
    }
  }
}

module.exports = scopeMix
