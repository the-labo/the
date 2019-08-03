'use strict'

/**
 * @memberof module:@the-/code.ast.nodes
 * @function sortMethodsOnClassNode
 */
const {
  byType,
  compareBy,
  compareStrings,
} = require('../../helpers/arrayHelper')

/** @lends module:@the-/code.ast.nodes.sortMethodsOnClassNode */
function sortMethodsOnClassNode(ClassNode, { swap }) {
  const ClassMethods = [
    ...ClassNode.body.filter(byType('ClassMethod')),
    ...ClassNode.body.filter(byType('ClassPrivateMethod')),
    ...ClassNode.body.filter(byType('ClassProperty')),
    ...ClassNode.body.filter(byType('ClassPrivateProperty')),
  ]
  const sortedByStart = [...ClassMethods].sort(compareBy('start'))
  const sortedByName = [...ClassMethods].sort((a, b) => {
    const aWeight = _weightMethod(a)
    const bWeight = _weightMethod(b)
    if (aWeight !== bWeight) {
      return aWeight - bWeight
    }

    return compareStrings(_nameOfMethod(a), _nameOfMethod(b))
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

const _nameOfMethod = (method) => {
  const {
    key: { id, name },
  } = method
  if (name) {
    return name
  }

  if (id && id.name) {
    return id.name
  }

  const {
    key: { object, property },
  } = method
  return [property.name, object.name].join('.')
}

const _weightMethod = (method) => {
  let weight = 0
  switch (method.kind) {
    case 'constructor':
      weight = -10000
      break
    case 'get':
      weight = -10
      break
    case 'set':
      weight = -11
      break
    default:
      break
  }

  switch (method.value && method.value.type) {
    default:
      break
  }

  switch (method.type) {
    case 'ClassProperty':
    case 'ClassPrivateProperty':
      weight -= 100
      break
    default:
      break
  }

  switch (method.key.type) {
    case 'PrivateName':
      weight -= 200
      break
    default:
      break
  }

  if (method.static) {
    weight -= 100000
  }

  if (method.async) {
    weight += 3
  }

  if (method.generator) {
    weight += 2
  }

  if (method.computed) {
    weight -= 30
  }

  const name = _nameOfMethod(method)
  if (!name) {
    return weight
  }

  if (name[0].toUpperCase() === name[0]) {
    weight -= 20
  }

  if (/^_/.test(name[0])) {
    weight += 50
  }

  return weight
}

module.exports = sortMethodsOnClassNode
