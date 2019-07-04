'use strict'
/**
 * @memberof module:@the-/code.ast.nodes
 * @function sortPropertiesOnObjectNode
 */
const { compareBy, compareStrings } = require('../../helpers/arrayHelper')

const _nameOfPropKey = (key) =>
  String(
    key.name ||
      key.value ||
      key.raw ||
      (key.property && key.property.name) ||
      '',
  )

const _weightProperty = ({ async: async_, computed, key, kind, method }) => {
  let weight = 0
  if (computed) {
    weight -= 500
  }
  switch (key.type) {
    case 'StringLiteral':
      weight -= 100
      break
    default:
      weight += 100
      break
  }
  switch (kind) {
    case 'get':
      weight = -10
      break
    case 'set':
      weight = -11
      break
    default:
      break
  }
  if (method) {
    weight += 100
  }
  if (async_) {
    weight += 3
  }
  const name = _nameOfPropKey(key)
  if (!name) {
    return weight
  }
  if (name[0] && name[0].toUpperCase() === name[0]) {
    weight -= 10
  }
  if (/^_/.test(name)) {
    weight += 10
  }
  if (/^\$/.test(name)) {
    weight -= 1000
  }
  return weight
}

/** @lends module:@the-/code.ast.nodes.sortPropertiesOnObjectNode */
function sortPropertiesOnObjectNode(obj, { get, swap }) {
  const { properties } = obj
  if (!properties) {
    return
  }

  const sortableProperties = properties.reduce(
    (sliced, cur) => {
      const isProperty = [
        'ObjectProperty',
        'ObjectMethod',
        'RestProperty',
      ].includes(cur.type)
      if (isProperty) {
        sliced[sliced.length - 1].properties.push(cur)
      } else {
        sliced.push({ properties: [] })
      }
      return sliced
    },
    [{ properties: [], wrapper: obj }],
  )
  for (const { properties } of sortableProperties) {
    if (properties.length === 0) {
      continue
    }
    const sortedByStart = [...properties].sort(compareBy('start'))
    const sortedByName = [...properties].sort((a, b) => {
      if (!a.key || !b.key) {
        return -1
      }
      const aWeight = _weightProperty(a)
      const bWeight = _weightProperty(b)
      if (aWeight !== bWeight) {
        return aWeight - bWeight
      }
      const aName = _nameOfPropKey(a.key) || get([a.key.start, a.key.end])
      const bName = _nameOfPropKey(b.key) || get([b.key.start, b.key.end])
      return compareStrings(aName, bName)
    })
    const rangeFor = (PropertyNode) => {
      const [leadingComment] = (PropertyNode.leadingComments || []).sort(
        (a, b) => a.start - b.start,
      )
      return [
        leadingComment ? leadingComment.start : PropertyNode.start,
        PropertyNode.end,
      ]
    }

    for (let i = 0; i < sortedByStart.length; i++) {
      const byStart = sortedByStart[i]
      const byName = sortedByName[i]
      if (byStart.start !== byName.start) {
        return swap(rangeFor(byStart), rangeFor(byName))
      }
    }
  }
}

module.exports = sortPropertiesOnObjectNode
