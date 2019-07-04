/**
 * Scope access
 * @memberof module:@the-/facade-scope
 * @function resultAccessFor
 * @param {Object} scope
 * @returns {Object} - Face object for resultAccess access
 */
'use strict'

/** @lends module:@the-/facade-scope.resultAccessFor */
function resultAccessFor(scope) {
  /**
   * @memberof module:@the-/facade-scope.resultAccessFor
   * @inner
   * @namespace resultAccess
   */
  const resultAccess = {
    get state() {
      return scope.get('result')
    },
    async save(handler) {
      const result = await handler()
      if (typeof result === 'undefined') {
        throw new Error('[resultAccess] Handle must return result')
      }
      scope.set({ result })
      return result
    },
  }

  Object.freeze(resultAccess)

  return resultAccess
}

module.exports = resultAccessFor
