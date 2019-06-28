/**
 * Bush scope access
 * @memberof module:@the-/facade-scope
 * @function createOperationFor
 * @param {Object} scope
 * @returns {Object} - Face object for createOperationFor access
 */
'use strict'

const busyAccessFor = require('../busyAccessFor')
const entryAccessFor = require('../entryAccessFor')

/** @lends module:@the-/facade-scope.createOperationFor */
function createOperationFor(scope) {
  const entryAccess = entryAccessFor(scope)
  const busyAccess = busyAccessFor(scope)

  /**
   * @memberof module:@the-/facade-scope.createOperationFor
   * @inner
   * @namespace createOperation
   */
  const createOperation = {
    busyAccess,
    entryAccess,
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
      await busyAccess.while(async () => entryAccess.process(handler))
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
