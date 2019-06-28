/**
 * Bush scope access
 * @memberof module:@the-/facade-scope
 * @function entryAccessFor
 * @param {Object} scope
 * @returns {Object} - Face object for entryAccess access
 */
'use strict'

const { expand, flatten } = require('objnest')

/** @lends module:@the-/facade-scope.entryAccessFor */
function entryAccessFor(scope) {
  /**
   * @memberof module:@the-/facade-scope.entryAccessFor
   * @inner
   * @namespace entryAccess
   */
  const entryAccess = {
    delError(...names) {
      scope.entryErrors.del(...names)
    },
    getEntry(options = {}) {
      const { raw = false } = options
      const entry = scope.get('entry')
      if (raw) {
        return entry
      }
      return expand(entry)
    },
    getErrors() {
      return scope.get('entryErrors')
    },
    hasErrorFor(name) {
      const errors = entryAccess.getErrors()
      return name in errors
    },
    async process(handler) {
      const entry = entryAccess.getEntry()
      try {
        await handler(entry)
      } catch (e) {
        // TODO Handle error
        throw e
      }
    },
    set(entry) {
      const current = entryAccess.getEntry()
      scope.set({
        entry: flatten({ ...current, ...entry }),
      })
      // Create errors
      {
        const names = Object.keys(entry).filter((name) =>
          entryAccess.hasErrorFor(name),
        )
        entryAccess.delError(...names)
      }
    },
    get state() {
      return entryAccess.getEntry({ raw: true })
    },
  }

  Object.freeze(entryAccess)

  return entryAccess
}

module.exports = entryAccessFor
