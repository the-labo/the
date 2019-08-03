'use strict'

/**
 * Process export statement
 * @memberof module:@the-/code.processors
 * @function processJSExport
 * @param {string} content
 * @returns {string} processed
 */
const { EOL } = require('os')
const {
  constants: { NodeTypes },
  finder,
  parse,
} = require('@the-/ast')
const sortExportNamedDeclarationsOnProgramNode = require('../ast/nodes/sortExportNamedDeclarationsOnProgramNode')
const applyConverter = require('../helpers/applyConverter')
const contentAccess = require('../helpers/contentAccess')

/** @lends module:@the-/code.processors.processJSExport */
function processJSExport(content, options = {}) {
  function splitExportAndDeclaration(DefaultExport, { get, replace }) {
    const { declaration } = DefaultExport
    if (!declaration.id) {
      return
    }
    const canSplit =
      !!declaration.id.name &&
      [NodeTypes.FunctionDeclaration, NodeTypes.ClassDeclaration].includes(
        declaration.type,
      )
    if (canSplit) {
      const declarationCode = get(declaration.range)
      return replace(
        DefaultExport.range,
        [declarationCode, '', `export default ${declaration.id.name}`].join(
          EOL,
        ),
      )
    }
  }

  return applyConverter(content, (content) => {
    const { get, replace, swap } = contentAccess(content)
    const parsed = parse(content, options)
    const converted = sortExportNamedDeclarationsOnProgramNode(parsed.program, {
      swap,
    })
    if (converted) {
      return converted
    }

    const [DefaultExport] = finder.findByTypes(parsed, [
      NodeTypes.ExportDefaultDeclaration,
    ])
    if (DefaultExport) {
      const converted = splitExportAndDeclaration(DefaultExport, {
        get,
        replace,
      })
      if (converted) {
        return converted
      }
    }

    return content
  })
}

module.exports = processJSExport
