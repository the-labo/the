'use strict'

const busyAccessFor = require('../busyAccessFor')
const entryAccessFor = require('../entryAccessFor')
const resultAccessFor = require('../resultAccessFor')

/**
 * Scope access
 * @memberof module:@the-/facade-scope
 * @function createOperationFor
 * @param {Object} scope
 * @returns {Object} - Face object for createOperationFor access
 */
function createOperationFor(scope) {
  const entryAccess = entryAccessFor(scope)
  const resultAccess = resultAccessFor(scope)
  const busyAccess = busyAccessFor(scope)

  /**
   * @memberof module:@the-/facade-scope.createOperationFor
   * @inner
   * @namespace createOperation
   */
  const createOperation = {
    busyAccess,
    entryAccess,
    resultAccess,
    getEntry() {
      return entryAccess.state
    },
    getResult() {
      return resultAccess.state
    },
    /**
     * Init scope
     */
    init() {
      scope.init()
    },
    /**
     * Execute creating
     * @param {function(object): Promise} handler
     * @returns {Promise<undefined>}
     * @example
     * await createOperation.exec(async (values) => {
     *   await someCtrl.create(values)
     * })
     */
    async exec(handler) {
      return resultAccess.save(async () =>
        busyAccess.while(async () => entryAccess.process(handler)),
      )
    },
    /**
     * Set entry
     * @param {Object} entry
     * @returns {Promise<undefined>}
     */
    async setEntry(entry) {
      entryAccess.set(entry)
    },
  }

  Object.freeze(createOperation)

  return createOperation
}

module.exports = createOperationFor
