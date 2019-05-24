/**
 * @memberof module:@the-/code.processors
 * @function processPackageLockJSON
 */
'use strict'

const applyConverter = require('../helpers/applyConverter')

/** @lends module:@the-/code.processors.processPackageLockJSON */
function processPackageLockJSON(content, options = {}) {
  return applyConverter(content, (content) => {
    // Do nothing
    return content
  })
}

module.exports = processPackageLockJSON
