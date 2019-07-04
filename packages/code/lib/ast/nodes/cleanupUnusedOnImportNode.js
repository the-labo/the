'use strict'
/**
 * @memberof module:@the-/code.ast.nodes
 * @function cleanupUnusedOnImportNode
 */
const {
  isImportDefaultSpecifier,
  isImportSpecifier,
} = require('../../helpers/astHelper')

/** @lends module:@the-/code.ast.nodes.cleanupUnusedOnImportNode */
function cleanupUnusedOnImportNode(
  ImportDeclaration,
  { ConsumingIdentifiers, get, keep = ['React'], replace, search },
) {
  const { specifiers } = ImportDeclaration
  if (!specifiers) {
    return null
  }
  const ImportSpecifiers = specifiers.filter(isImportSpecifier)
  for (let i = 0; i < specifiers.length; i++) {
    const specifier = specifiers[i]
    const shouldKeep = keep.includes(specifier.local.name)
    if (shouldKeep) {
      continue
    }
    const nextSpecifier = specifiers[i + 1]
    const usages = [
      ...ConsumingIdentifiers.filter(
        (Identifier) => Identifier !== specifier.local,
      )
        .filter((Identifier) => Identifier !== specifier.imported)
        .filter((Identifier) => Identifier.name === specifier.local.name),
    ]
    const unused = usages.length === 0
    if (!unused) {
      continue
    }
    const removeDeclaration = specifiers.length === 1
    if (removeDeclaration) {
      const start =
        ImportDeclaration.loc.start.column === 0
          ? ImportDeclaration.start - 1
          : ImportDeclaration.start
      const { end } = ImportDeclaration
      return replace([start, end], '')
    } else {
      if (isImportDefaultSpecifier(specifier)) {
        const { start } = specifier
        const commaAt = search(',', {
          finish: ImportDeclaration.end,
          offset: specifier.end,
        })
        const end = nextSpecifier ? commaAt + 1 : specifier.end
        return replace([start, end], '')
      }
      if (isImportSpecifier(specifier)) {
        const isTheLastImportSpecifier = ImportSpecifiers.length === 1
        if (isTheLastImportSpecifier) {
          const ImportDefaultSpecifier = specifiers.find(
            isImportDefaultSpecifier,
          )
          const as = get([
            ImportDefaultSpecifier.start,
            ImportDefaultSpecifier.end,
          ])
          const from = get([
            ImportDeclaration.source.start,
            ImportDeclaration.source.end,
          ])
          return replace(
            [ImportDeclaration.start, ImportDeclaration.end],
            `import ${as} from ${from}`,
          )
        }
        const { start } = specifier
        const end = nextSpecifier ? nextSpecifier.start : specifier.end
        return replace([start, end], '')
      }
    }
  }
}

module.exports = cleanupUnusedOnImportNode
