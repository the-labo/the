'use strict'

/**
 * @memberof module:@the-/code.processors
 * @function processPackageLockJSON
 */
const applyConverter = require('../helpers/applyConverter')

/** @lends module:@the-/code.processors.processPackageLockJSON */
function processPackageLockJSON(content, options = {}) {
  return applyConverter(
    content,
    (content) =>
      // Do nothing
      content,
    { name: 'processPackageLockJSON' },
  )
}

module.exports = processPackageLockJSON
