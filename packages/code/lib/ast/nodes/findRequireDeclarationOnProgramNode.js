'use strict'

const { walk } = require('@the-/ast')

const isRequireCall = (call) => {
  const {
    arguments: [arg],
  } = call
  return call.callee.name === 'require' && arg && arg.type === 'StringLiteral'
}

/**
 * @memberof module:@the-/code.ast.nodes
 * @function findRequireDeclarationOnProgramNode
 */
function findRequireDeclarationOnProgramNode(ProgramNode) {
  const VariableDeclarations = []
  walk.simple(ProgramNode, {
    VariableDeclaration: (node) => VariableDeclarations.push(node),
  })

  return VariableDeclarations.filter(({ declarations }) => {
    const { init } = (declarations && declarations[0]) || {}
    if (!init) {
      return false
    }

    switch (init.type) {
      case 'CallExpression':
        return isRequireCall(init)
      case 'MemberExpression':
        if (init.object.type === 'CallExpression') {
          const { object } = init
          return isRequireCall(object)
        }

        return false
      default:
        return false
    }
  }).filter(Boolean)
}

module.exports = findRequireDeclarationOnProgramNode
