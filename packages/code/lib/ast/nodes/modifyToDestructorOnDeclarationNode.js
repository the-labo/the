'use strict'

const {
  constants: { NodeTypes },
} = require('@the-/ast')

/**
 * @memberof module:@the-/code.ast.nodes
 * @function modifyToDestructorOnDeclarationNode
 * @returns {*}
 */
function modifyToDestructorOnDeclarationNode(
  VariableDeclaration,
  { get, replace },
) {
  const { declarations, kind } = VariableDeclaration
  if (declarations.length !== 1) {
    return
  }

  const [declaration] = declarations
  const { id, init } = declaration

  const isMemberAssign = init && init.type === NodeTypes.MemberExpression

  const shouldObjectDestructure =
    isMemberAssign &&
    !init.computed &&
    init.property.type === NodeTypes.Identifier

  const asDestructor = (specifier) =>
    replace(
      [VariableDeclaration.start, VariableDeclaration.end],
      `${kind} ${specifier} = ${get([init.object.start, init.object.end])}`,
    )

  if (shouldObjectDestructure) {
    switch (id.type) {
      case NodeTypes.ArrayPattern:
      case NodeTypes.ObjectPattern: {
        const {
          property: { name: key },
        } = init
        const specifier = `{ ${key}: ${get([id.start, id.end])} }`
        return asDestructor(specifier)
      }
      case NodeTypes.Identifier: {
        const { name: as } = id
        const {
          property: { name: key },
        } = init
        const specifier = as === key ? `{ ${key} }` : `{ ${key}: ${as} }`
        return asDestructor(specifier)
      }
      default:
        break
    }
  }

  const shouldArrayDestructure =
    isMemberAssign &&
    init.computed &&
    init.property.type === NodeTypes.NumericLiteral
  if (shouldArrayDestructure) {
    const {
      property: { value: index },
    } = init
    const filling = new Array(index + 1).fill('').join(', ')
    switch (id.type) {
      case NodeTypes.ArrayPattern:
      case NodeTypes.ObjectPattern: {
        const specifier = `[ ${filling}${get([id.start, id.end])} ]`
        return asDestructor(specifier)
      }
      case NodeTypes.Identifier: {
        const { name: as } = id
        const specifier = `[ ${filling}${as} ]`
        return asDestructor(specifier)
      }
      default:
        break
    }
  }
}

module.exports = modifyToDestructorOnDeclarationNode
