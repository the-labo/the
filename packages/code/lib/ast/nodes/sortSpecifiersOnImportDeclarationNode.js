'use strict'

/**
 * @memberof module:@the-/code.ast.nodes
 * @function sortSpecifiersOnImportDeclarationNode
 */
const { compareBy } = require('../../helpers/arrayHelper')

const specifierName = (specifier) => specifier.imported.name

/** @lends module:@the-/code.ast.nodes.sortSpecifiersOnImportDeclarationNode */
function sortSpecifiersOnImportDeclarationNode(ImportDeclaration, { swap }) {
  const { specifiers } = ImportDeclaration
  if (specifiers.length === 0) {
    return
  }

  const importedSpecifiers = specifiers.filter(({ imported }) => !!imported)
  const sortedByStart = [...importedSpecifiers].sort(compareBy('start'))
  const sortedByName = [...importedSpecifiers].sort((a, b) =>
    specifierName(a).localeCompare(specifierName(b)),
  )

  for (let i = 0; i < sortedByStart.length; i++) {
    const byStart = sortedByStart[i]
    const byName = sortedByName[i]
    if (byStart.start !== byName.start) {
      return swap([byStart.start, byStart.end], [byName.start, byName.end])
    }
  }
}

module.exports = sortSpecifiersOnImportDeclarationNode
