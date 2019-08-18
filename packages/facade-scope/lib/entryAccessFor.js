'use strict'

const { expand, flatten } = require('objnest')

/**
 * Scope access
 * @memberof module:@the-/facade-scope
 * @function entryAccessFor
 * @param {Object} scope
 * @returns {Object} - Face object for entryAccess access
 */
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
    get(options = {}) {
      return entryAccess.getEntry(options)
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
    hasEntryErrorFor(name) {
      const errors = entryAccess.getEntryErrors()
      return name in errors
    },
    set(entry) {
      return entryAccess.setEntry(entry)
    },
    setEntry(entry) {
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
    setEntryErrors(entryErrors) {
      scope.set({ entryErrors })
    },
    async process(handler) {
      const entry = entryAccess.getEntry()
      try {
        return await handler(entry)
      } catch (e) {
        const { entryErrors } = e
        if (entryErrors) {
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
