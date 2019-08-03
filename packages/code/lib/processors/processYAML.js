'use strict'

/**
 * @memberof module:@the-/code.processors
 * @function processYAML
 * @param {string} content
 * @returns {string}
 */
const YAML = require('yaml')
const { strOptions } = require('yaml/types')

strOptions.fold.lineWidth = 0

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
  const [error] = doc.errors || []
  if (error) {
    console.log(
      `[@the-/code][processYAML] Failed to parse yaml with error: ${error.message}`,
    )
    return content
  }

  doc.contents = _processYAMLNode(doc.contents)
  try {
    return String(doc)
  } catch (e) {
    if (/Alias node must be after source node/.test(e.message)) {
      console.warn(
        '[@the-/code][processYAML] Failed to sort yaml due to anchor/alias order problem (see https://github.com/yaml/yaml/issues/12)',
      )
      return content
    }

    throw e
  }
}

module.exports = processYAML
