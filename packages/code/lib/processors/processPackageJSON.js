'use strict'

const { sortProperties } = require('fmtjson')
const { EOL } = require('os')
const applyConverter = require('../helpers/applyConverter')

/**
 * @memberof module:@the-/code.processors
 * @function processPackageJSON
 * @param content
 * @param [options={}]
 * @returns {*}
 */
function processPackageJSON(content, options = {}) {
  return applyConverter(
    content,
    (content) => {
      const { author, description, name, version, ...rest } = JSON.parse(
        content,
      )
      const sorted = {}
      sorted.name = name
      sorted.description = description
      sorted.version = version
      sorted.author = author
      Object.assign(sorted, sortProperties(rest))
      return JSON.stringify(sorted, null, 2) + EOL
    },
    { name: 'processPackageJSON' },
  )
}

module.exports = processPackageJSON
