/**
 * @memberOf module:@the-/code.processors
 * @function processYAML
 * @param {string} content
 * @returns {string}
 */
'use strict'

const YAML = require('yaml')

const _processYAMLNode = (node) => {
  if (!node) {
    return node
  }
  const { items, type } = node
  if (!items) {
    return node
  }
  switch (type) {
    case 'MAP':
      node.items = items
        .sort((a, b) => a.key.value.localeCompare(b.key.value))
        .map((item) => {
          item.value = _processYAMLNode(item.value)
          return item
        })
      return node
    case 'SEQ':
      node.items = items.map((item) => {
        item = _processYAMLNode(item)
        return item
      })
      return node
    default:
      return node
  }
}

/** @lends module:@the-/code.processors.processYAML */
async function processYAML(content) {
  const doc = YAML.parseDocument(content)
  doc.contents = _processYAMLNode(doc.contents)
  return String(doc)
}

module.exports = processYAML
