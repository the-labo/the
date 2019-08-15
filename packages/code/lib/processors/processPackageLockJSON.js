'use strict'

const applyConverter = require('../helpers/applyConverter')

/**
 * @memberof module:@the-/code.processors
 * @function processPackageLockJSON
 */
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
