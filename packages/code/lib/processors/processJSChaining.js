'use strict'

const applyConverter = require('../helpers/applyConverter')

/**
 * @memberof module:@the-/code.processors
 * @function processJSChaining
 * @param content
 * @param [options={}]
 * @returns {*}
 */
function processJSChaining(content, options = {}) {
  return applyConverter(content, (content) => content, {
    name: 'processJSChaining',
  })
}

module.exports = processJSChaining
