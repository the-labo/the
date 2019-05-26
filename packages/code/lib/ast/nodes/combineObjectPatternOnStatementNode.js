/**
 * @memberof module:@the-/code.ast.nodes
 * @function {combineObjectPatternOnStatementNode}
 */
'use strict'

const {
  constants: { NodeTypes },
} = require('@the-/ast')

/** @lends module:@the-/code.ast.nodes.combineObjectPatternOnStatementNode */
function combineObjectPatternOnStatementNode(Statement, { get, replace }) {
  if (!Statement) {
    return
  }
  const hash = {}
  const VariableDeclarations = (Statement.body || []).filter(
    (node) => node.type === NodeTypes.VariableDeclaration,
  )
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
    const key = `____` + get(init.range)
    hash[kind][key] = hash[kind][key] || []
    hash[kind][key].push(VariableDeclaration)
  }

  const doCombine = (VariableDeclarations) => {
    const [first, ...otherDeclarations] = VariableDeclarations
    const { kind } = first
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
    const {
      declarations: [{ init }],
    } = first
    return replace(
      [first.start, last.end],
      [
        `${kind} ${id} = ${get([init.start, init.end])}`,
        ...otherDeclarations.map((cur, i, arr) => {
          const prev = arr[i - 1] || first
          return get([prev.end + 1, cur.start])
        }),
      ].join(''),
    )
  }

  for (const [kind, group] of Object.entries(hash)) {
    for (const [, VariableDeclarations] of Object.entries(group)) {
      if (VariableDeclarations.length > 1) {
        const combined = doCombine(VariableDeclarations)
        return combined
      }
    }
  }
}

module.exports = combineObjectPatternOnStatementNode
