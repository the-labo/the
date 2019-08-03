'use strict'

/**
 * Process import statement
 * @memberof module:@the-/code.processors
 * @function processJSImport
 * @param {string} content
 * @returns {string} processed
 */
const path = require('path')
const { parse, walk } = require('@the-/ast')
const {
  cleanupExtOnImportDeclarationNode,
  mergeDuplicateImportOnProgramNode,
  normalizeSrcPathOnImportDeclarationNode,
  sortSpecifiersOnImportDeclarationNode,
} = require('../ast/nodes')
const applyConverter = require('../helpers/applyConverter')
const contentAccess = require('../helpers/contentAccess')
const { weightModuleName } = require('../helpers/weightHelper')

/** @lends module:@the-/code.processors.processJSImport */
function processJSImport(content, options = {}) {
  const { filename } = options

  const importName = (d) => d.source.value

  return applyConverter(content, (content) => {
    const parsed = parse(content, options)
    const { get, replace, swap } = contentAccess(content)

    {
      const merged = mergeDuplicateImportOnProgramNode(parsed.program, {
        get,
        replace,
      })
      if (merged) {
        return merged
      }
    }

    const ImportDeclarations = []
    const VariableDeclarations = []
    const FunctionDeclarations = []
    walk.simple(parsed.program, {
      FunctionDeclaration: (node) => FunctionDeclarations.push(node),
      ImportDeclaration: (node) => ImportDeclarations.push(node),
      VariableDeclaration: (node) => VariableDeclarations.push(node),
    })
    const ImportDeclarationsToSort = ImportDeclarations.filter(
      (dec) => dec.specifiers.length > 0,
    )
    const sortedByStart = [...ImportDeclarationsToSort].sort(
      (a, b) => a.start - b.start,
    )
    const sortedByName = [...ImportDeclarationsToSort].sort((a, b) => {
      const aName = importName(a)
      const bName = importName(b)
      const aWeight = weightModuleName(aName)
      const bWeight = weightModuleName(bName)
      if (aWeight !== bWeight) {
        return aWeight - bWeight
      }

      return aName.localeCompare(bName)
    })
    for (let i = 0; i < sortedByStart.length; i++) {
      const byStart = sortedByStart[i]
      const byName = sortedByName[i]
      if (byStart.start !== byName.start) {
        return swap([byStart.start, byStart.end], [byName.start, byName.end])
      }
    }

    // No empty line between import statements
    for (let i = 0; i < sortedByStart.length - 1; i++) {
      const { end: start } = sortedByStart[i]
      const end = sortedByStart[i + 1].start - 1
      if (/^\s+$/.test(content.substring(start, end))) {
        return replace([start, end], '')
      }
    }

    const startsForImport = ImportDeclarations.map(({ start }) => start)
    const OtherDeclarations = [
      ...VariableDeclarations,
      ...FunctionDeclarations,
    ].filter(({ start }) => !startsForImport.includes(start))

    for (const Declaration of OtherDeclarations.sort(
      (a, b) => b.start - a.start,
    )) {
      const Import = sortedByStart[sortedByStart.length - 1]
      if (Import && Declaration.start < Import.start) {
        return swap(
          [Declaration.start, Declaration.end],
          [Import.start, Import.end],
        )
      }
    }

    const extToRemove = /\.js$|\.json$/
    const dirname = filename && path.dirname(filename)
    for (const ImportDeclaration of ImportDeclarations) {
      const converted =
        sortSpecifiersOnImportDeclarationNode(ImportDeclaration, { swap }) ||
        normalizeSrcPathOnImportDeclarationNode(ImportDeclaration, {
          dirname,
          replace,
        }) ||
        cleanupExtOnImportDeclarationNode(ImportDeclaration, {
          extToRemove,
          replace,
        })
      if (converted) {
        return converted
      }
    }

    return content
  })
}

module.exports = processJSImport
