'use strict'

const {
  constants: { NodeTypes },
  finder,
} = require('@the-/ast')
const combineOnVariableDeclarationNodes = require('./combineOnVariableDeclarationNodes')

/**
 * @memberof module:@the-/code.ast.nodes
 * @function combineObjectPatternOnStatementNode
 * @returns {*}
 */
function combineObjectPatternOnStatementNode(Statement, { get, replace }) {
  if (!Statement) {
    return
  }

  const doNest = (VariableDeclarations) => {
    const _escape = (name) => `${name}____`
    const byInitNameHash = VariableDeclarations.reduce(
      (byInitNameHash, VariableDeclaration) => {
        const {
          declarations: [{ init }],
        } = VariableDeclaration
        if (init.type === NodeTypes.Identifier) {
          const key = _escape(init.name)
          return {
            ...byInitNameHash,
            [key]: [...(byInitNameHash[key] || []), VariableDeclaration],
          }
        }

        return { ...byInitNameHash }
      },
      {},
    )
    for (const VariableDeclaration of VariableDeclarations) {
      const ObjectProperties = finder
        .findByTypes(VariableDeclaration, [NodeTypes.ObjectProperty])
        .filter((property) => {
          const { value } = property
          return value && value.type === NodeTypes.Identifier
        })
      for (const property of ObjectProperties) {
        const { value } = property
        const [nested] = byInitNameHash[_escape(value.name)] || []
        const shouldNest = !!nested && property.start < nested.start
        if (shouldNest) {
          const {
            declarations: [declaration],
          } = nested
          return replace(
            [property.start, nested.end],
            [
              get([property.start, property.end]),
              `, ${property.key.name}: ${get(declaration.id.range)}`,
              get([property.end, nested.start]),
            ].join(''),
          )
        }
      }
    }
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
        const combined = combineOnVariableDeclarationNodes(
          VariableDeclarations,
          {
            get,
            replace,
          },
        )
        if (combined) {
          return combined
        }
      }
      const inGroups = Object.entries(group).reduce(
        (inGroups, [, VariableDeclarations]) => [
          ...VariableDeclarations,
          ...inGroups,
        ],
        [],
      )
      const nested = doNest(inGroups)
      if (nested) {
        return nested
      }
    }
  }
}

module.exports = combineObjectPatternOnStatementNode
