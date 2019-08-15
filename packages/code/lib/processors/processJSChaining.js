'use strict'

const applyConverter = require('../helpers/applyConverter')

/**
 * @memberof module:@the-/code.processors
 * @function processJSChaining
 */
function processJSChaining(content, options = {}) {
  return applyConverter(content, (content) => content, {
    name: 'processJSChaining',
  })
}

module.exports = processJSChaining
