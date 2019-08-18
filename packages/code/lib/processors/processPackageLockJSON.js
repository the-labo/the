'use strict'

const applyConverter = require('../helpers/applyConverter')

/**
 * @memberof module:@the-/code.processors
 * @function processPackageLockJSON
 * @param content
 * @param [options={}]
 * @returns {*}
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
