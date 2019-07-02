/**
 * Scope access
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
    get state() {
      return entryAccess.getEntry({ raw: true })
    },
    deleteEntryError(...names) {
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
    getEntryErrors() {
      return scope.get('entryErrors')
    },
    setEntryErrors(entryErrors){
      scope.set(entryErrors)
    },
    hasEntryErrorFor(name) {
      const errors = entryAccess.getEntryErrors()
      return name in errors
    },
    set(entry) {
      const current = entryAccess.getEntry()
      scope.set({
        entry: flatten({ ...current, ...entry }),
      })
      // Create errors
      {
        const names = Object.keys(entry).filter((name) =>
          entryAccess.hasEntryErrorFor(name),
        )
        entryAccess.deleteEntryError(...names)
      }
    },
    async process(handler) {
      const entry = entryAccess.getEntry()
      try {
        await handler(entry)
      } catch (e) {
        const {entryErrors} = e
        if(entryErrors){
          entryAccess.setEntryErrors(entryErrors)
        }
        throw e
      }
    },
  }

  Object.freeze(entryAccess)

  return entryAccess
}

module.exports = entryAccessFor
