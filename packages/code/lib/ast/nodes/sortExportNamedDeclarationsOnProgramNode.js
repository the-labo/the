'use strict'

const {
  constants: { NodeTypes },
  finder,
} = require('@the-/ast')
const { compareStrings } = require('../../helpers/arrayHelper')

/**
 * @memberof module:@the-/code.ast.nodes
 * @function sortExportNamedDeclarationsOnProgramNode
 */
function sortExportNamedDeclarationsOnProgramNode(ProgramNode, { swap }) {
  const ExportNamedDeclarations = finder.findByTypes(ProgramNode, [
    NodeTypes.ExportNamedDeclaration,
  ])

  const _rangeFor = (node) => {
    const [leadingComment] = node.leadingComments || []
    return [leadingComment ? leadingComment.start : node.start, node.end]
  }

  const _nameOfCase = ({ declaration }) => {
    const { id } = declaration || {}
    return id.name
  }
  const _weightCase = () => 0
  {
    const FunctionExports = ExportNamedDeclarations.filter(
      ({ declaration }) =>
        declaration && declaration.type === NodeTypes.FunctionDeclaration,
    )
    const sortedByStart = [...FunctionExports].sort((a, b) => a.start - b.start)
    const sortedByName = [...FunctionExports].sort((a, b) => {
      const aWeight = _weightCase(a)
      const bWeight = _weightCase(b)
      if (aWeight !== bWeight) {
        return aWeight - bWeight
      }

      return compareStrings(_nameOfCase(a), _nameOfCase(b))
    })
    for (let i = 0; i < sortedByStart.length; i++) {
      const byStart = sortedByStart[i]
      const byName = sortedByName[i]
      if (byStart.start !== byName.start) {
        return swap(_rangeFor(byStart), _rangeFor(byName))
      }
    }
  }
}

module.exports = sortExportNamedDeclarationsOnProgramNode
