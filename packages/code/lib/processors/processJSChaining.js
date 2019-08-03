/**
 * @memberof module:@the-/code.processors
 * @function processJSChaining
 */
'use strict'

const applyConverter = require('../helpers/applyConverter')

/** @lends module:@the-/code.processors.processJSChaining */
function processJSChaining(content, options = {}) {
  return applyConverter(content, (content) => content, {
    name: 'processJSChaining',
  })
}

module.exports = processJSChaining
