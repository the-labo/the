/**
 * @memberof module:@the-/code.ast.nodes
 * @function {combineObjectPatternOnStatementNode}
 */
'use strict'

const { EOL } = require('os')
const {
  constants: { NodeTypes },
} = require('@the-/ast')

/** @lends module:@the-/code.ast.nodes.combineObjectPatternOnStatementNode */
function combineObjectPatternOnStatementNode(Statement, { get, replace }) {
  if (!Statement) {
    return
  }

  const doCombine = (VariableDeclarations) => {
    const [first, ...restDeclarations] = VariableDeclarations
    const {
      declarations: [{ init }],
      kind,
    } = first
    const last = VariableDeclarations[VariableDeclarations.length - 1]
    const properties = VariableDeclarations.map((v) => v.declarations[0])
      .reduce(
        (properties, declaration) => [
          ...properties,
          ...declaration.id.properties,
        ],
        [],
      )
      .filter(Boolean)
    const id = `{${properties
      .map((property) => get(property.range))
      .join(', ')}}`

    return replace(
      [first.start, last.end],
      [
        `${kind} ${id} = ${get([init.start, init.end])}`,
        ...restDeclarations.map((cur, i, arr) => {
          const prev = arr[i - 1] || first
          return get([prev.end, cur.start])
        }),
      ]
        .join('')
        .split(EOL)
        .filter((line, i, lines) => {
          const prev = lines[i - 1]
          const skip = line === '' && i > 0 && prev === ''
          return !skip
        })
        .join(EOL),
    )
  }

  const VariableDeclarationGroups = (Statement.body || []).reduce(
    (groups, node) => {
      const isDeclaration = node.type === NodeTypes.VariableDeclaration
      if (isDeclaration) {
        const last = groups[groups.length - 1]
        last.push(node)
      } else {
        groups.push([])
      }
      return groups
    },
    [[]],
  )
  for (const VariableDeclarations of VariableDeclarationGroups) {
    const hash = {}
    for (const VariableDeclaration of VariableDeclarations) {
      const { declarations, kind } = VariableDeclaration
      if (declarations.length !== 1) {
        continue
      }
      const [declaration] = declarations
      const { id, init } = declaration
      if (id.type !== NodeTypes.ObjectPattern) {
        continue
      }
      hash[kind] = hash[kind] || {}
      const key = `____${get(init.range)}`
      hash[kind][key] = hash[kind][key] || []
      hash[kind][key].push(VariableDeclaration)
    }
    for (const [, group] of Object.entries(hash)) {
      for (const [, VariableDeclarations] of Object.entries(group)) {
        if (VariableDeclarations.length > 1) {
          const combined = doCombine(VariableDeclarations)
          return combined
        }
      }
    }
  }
}

module.exports = combineObjectPatternOnStatementNode
