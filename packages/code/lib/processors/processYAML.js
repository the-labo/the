'use strict'

const YAML = require('yaml')
const { strOptions } = require('yaml/types')

strOptions.fold.lineWidth = 0

const _processYAMLNode = (node, opt = {}) => {
  if (!node) {
    return node
  }
  const { depth = 0, rule = {} } = opt

  const { items, type } = node
  if (!items) {
    return node
  }

  const childOpt = { depth: depth + 1, rule }
  switch (type) {
    case 'MAP':
      node.items = items
        .sort((a, b) => {
          const shouldSortByRule = depth < (rule.sortKeysDepth || 1) && !!rule.sortKeys
          if (shouldSortByRule) {
            const sortKeys = [...rule.sortKeys].reverse()
            const aWeight = sortKeys.indexOf(a.key.value)
            const bWeight = sortKeys.indexOf(b.key.value)
            if (aWeight !== bWeight) {
              return bWeight - aWeight
            }
          }
          return a.key.value.localeCompare(b.key.value)
        })
        .map((item) => {
          item.value = _processYAMLNode(item.value, childOpt)
          return item
        })
      return node
    case 'SEQ':
      node.items = items.map((item) => {
        item = _processYAMLNode(item, childOpt)
        return item
      })
      return node
    default:
      return node
  }
}

/**
 * @memberof module:@the-/code.processors
 * @function processYAML
 * @param {string} content
 * @param {Object} [options={}]
 * @returns {string}
 */
async function processYAML(content, options = {}) {
  const { rule = {} } = options
  const doc = YAML.parseDocument(content)
  const [error] = doc.errors || []
  if (error) {
    console.log(
      `[@the-/code][processYAML] Failed to parse yaml with error: ${error.message}`,
    )
    return content
  }

  doc.contents = _processYAMLNode(doc.contents, { rule })
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
