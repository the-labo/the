'use strict'

const { EOL } = require('os')
const {
  constants: { NodeTypes },
  finder,
} = require('@the-/ast')

const compareStart = (a, b) => a.start - b.start

/**
 * @memberof module:@the-/code.ast.nodes
 * @function mergeDuplicateImportOnProgramNode
 * @returns {*}
 */
function mergeDuplicateImportOnProgramNode(programNode, { get, replace }) {
  const ImportDeclarations = finder.findByTypes(programNode, [
    NodeTypes.ImportDeclaration,
  ])
  const bySource = ImportDeclarations.reduce((reduced, ImportDeclaration) => {
    const {
      source: { value: from },
    } = ImportDeclaration
    return {
      ...reduced,
      [from]: [...(reduced[from] || []), ImportDeclaration].sort(compareStart),
    }
  }, {})
  for (const [from, declarations] of Object.entries(bySource)) {
    if (declarations.length <= 1) {
      continue
    }

    const specifiers = declarations
      .reduce(
        (specifiers, declaration) => [...specifiers, ...declaration.specifiers],
        [],
      )
      .sort(compareStart)
    if (specifiers.length === 0) {
      continue
    }

    const [{ start }] = declarations
    const { end } = declarations[declarations.length - 1]
    const original = get([start, end])
    const merged = declarations
      .sort(compareStart)
      .reverse()
      .reduce((code, declaration, i) => {
        const dStart = declaration.start - start
        const dEnd = declaration.end - start
        const before = code.substring(0, dStart)
        const after = code.substring(dEnd)
        if (i === declarations.length - 1) {
          const Default = specifiers.find(
            ({ type }) => type === 'ImportDefaultSpecifier',
          )
          const Others = specifiers
            .filter(({ type }) => type !== 'ImportDefaultSpecifier')
            .sort(compareStart)
          const imported = [
            Default && get([Default.start, Default.end]),
            Others.length > 0 &&
              `{ ${Others.map(({ end, start }) => get([start, end])).join(
                ', ',
              )} }`,
          ]
            .filter(Boolean)
            .join(', ')
          return [before, `import ${imported} from '${from}'`, after]
            .filter(Boolean)
            .join(EOL)
        }

        return [before, '', after].join('')
      }, original)
    if (original !== merged) {
      return replace([start, end], merged)
    }
  }
}

module.exports = mergeDuplicateImportOnProgramNode
